import React, { Component } from "react";
import Pressure from "pressure";

// Styled Components
import TrainingStageComp from "../trainingStage/TrainingStage.js";
import TableComp from "../../table/Table.js";
import TableBodyComp from "../../table/TableBody.js";
import TrComp from "../../table/Tr.js";
import TdComp from "../../table/Td.js";

// Sounds
import click from "../../../sound/click.mov";

// Helper
import {
  getEnrichedResults,
  getAnswerScore,
  getTimeScore,
  getTime
} from "../../../utils/results.js";

class UserInputStage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: this.props.round,
      startTime: null,
      endTime: null,
      patternSize: this.props.patternLength,
      pattern: this.props.currentRound.pattern,
      selectedElements: [],
      click: {
        start: 0,
        end: 0,
        xCoordinate: 0,
        yCoordinate: 0,
        force: 0,
        duration: 0
      },
      fallbackClick: {
        start: 0,
        xCoordinate: 0,
        yCoordinate: 0
      }
    };
    this.clicking = new Audio(click);
  }
  handleFallbackClickStart = event => {
    const clickStart = Date.now();
    const xCoordinate = event.touches[0].clientX;
    const yCoordinate = event.touches[0].clientY;
    this.setState(
      {
        ...this.state,
        fallbackClick: { start: clickStart, xCoordinate, yCoordinate }
      },
      () => {
        this.props.saveClick(this.state.fallbackClick);
        this.setState({
          ...this.state,
          fallbackClick: {
            start: 0,
            xCoordinate: 0,
            yCoordinate: 0
          }
        });
      }
    );
  };

  componentDidMount() {
    const iOS =
      !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    if (iOS) {
      const element = document.getElementById("element");
      element.addEventListener(
        "touchstart",
        this.handleFallbackClickStart,
        false
      );
      Pressure.set("#element", {
        start: event => {
          const clickStart = Date.now();
          let xCoordinate;
          let yCoordinate;
          if (event.touches.length === 1) {
            const touch = event.touches[0];
            xCoordinate = touch.clientX;
            yCoordinate = touch.clientY;
          }
          this.setState({
            ...this.state,
            click: {
              ...this.state.click,
              start: clickStart,
              xCoordinate,
              yCoordinate
            }
          });
        },
        change: (force, event) => {
          this.setState({
            ...this.state,
            click: { ...this.state.click, force }
          });
        },
        end: () => {
          const clickEnd = Date.now();
          const clickStart = this.state.click.start;
          const clickDuration = getTime(clickStart, clickEnd);
          this.setState(
            {
              ...this.state,
              click: {
                ...this.state.click,
                end: clickEnd,
                duration: clickDuration
              }
            },
            () => {
              this.props.saveClick(this.state.click);
              this.setState({
                ...this.state,
                click: {
                  start: 0,
                  end: 0,
                  xCoordinate: 0,
                  yCoordinate: 0,
                  force: 0,
                  duration: 0
                }
              });
            }
          );
        }
      });
    }
  }

  componentWillMount() {
    this.setState({ startTime: Date.now() });
  }

  nextRound() {
    this.props.onSetNewSpeed(this.props.speed);
    this.props.onNextRound();
  }

  processResults(results, clicks) {
    const enrichedResults = getEnrichedResults(results, clicks);
    const stepsizeProperty = this.props.speed;

    this.props.onWriteToResults(
      enrichedResults,
      this.props.round,
      stepsizeProperty
    );
    this.adapt(enrichedResults);
  }

  adapt(enrichedResults) {
    // Always move on to round two
    if (this.props.round < 3) {
      this.nextRound();
      return;
    }
    // If the user played 10 rounds --> finish
    if (this.props.round === 10) {
      this.props.onShowResults();
      return;
    }
    const lastResults = this.props.results[this.props.round - 1].results;
    const answerScore = getAnswerScore(
      lastResults.correct,
      enrichedResults.correct
    );
    const timeScore = getTimeScore(
      lastResults.timeTakenInSec,
      enrichedResults.timeTakenInSec
    );
    // Decide whether we go to the next round or show results based on score
    // Good answer performance from round 3 (this is more or less a test) and round 2 is the first reference
    if (this.props.round >= 3) {
      // Good last results 4 or 5 correct answers and also 4 or 5 correct answers this round
      if (
        lastResults.correct >= 4 &&
        (answerScore === 0 || answerScore === -1)
      ) {
        // Good results
        this.nextRound();
        return;
      }
      if (lastResults.correct >= 4 && answerScore > 0) {
        // Bad results
        // Check the time when the user got 3 correct answers
        if (
          (enrichedResults.correct === 3 && timeScore > 1.5) ||
          enrichedResults.correct === 4
        ) {
          // Just ok since the time of input improved significant
          this.nextRound();
          return;
        } else {
          this.props.onShowResults();
          return;
        }
      }
      // This case is just triggered if round two was bad
      if (lastResults.correct < 4 && enrichedResults.correct >= 4) {
        // Round two was bad but now the user got it
        this.nextRound();
        return;
      }
      this.props.onShowResults();
      return;
    }
  }

  giveFeedback() {
    // Give feedback
    this.clicking.play();
  }

  selectElement(key, event) {
    this.giveFeedback();
    // Add element to selected elements
    const oldElements = this.state.selectedElements;
    const newElement = [key];
    const selectedElements = oldElements.concat(newElement);
    this.setState({
      selectedElements
    });
    // At this point check if the round is over
    if (this.state.selectedElements.length === this.props.patternLength - 1) {
      this.setState({
        endTime: Date.now()
      });
      // Invoke timeout so the state is set
      setTimeout(() => {
        this.processResults(this.state, this.props.clicks);
      }, 1);
    }
  }

  render() {
    return (
      <TrainingStageComp id="element">
        <TableComp>
          <TableBodyComp>
            <TrComp>
              {this.props.elements.slice(0, 4).map((element, key) => {
                let enhancedElement;
                if (
                  element.key ===
                  this.state.selectedElements[
                    this.state.selectedElements.length - 1
                  ]
                ) {
                  enhancedElement = {
                    ...element,
                    props: {
                      ...element.props,
                      active: true
                    }
                  };
                } else {
                  enhancedElement = {
                    ...element,
                    props: {
                      ...element.props
                    }
                  };
                }
                return (
                  <TdComp
                    key={key}
                    onClick={() => this.selectElement(enhancedElement.key)}
                  >
                    {enhancedElement}
                  </TdComp>
                );
              })}
            </TrComp>
            <TrComp>
              {this.props.elements.slice(4, 8).map((element, key) => {
                let enhancedElement;
                if (
                  element.key ===
                  this.state.selectedElements[
                    this.state.selectedElements.length - 1
                  ]
                ) {
                  enhancedElement = {
                    ...element,
                    props: {
                      ...element.props,
                      active: true
                    }
                  };
                } else {
                  enhancedElement = {
                    ...element,
                    props: {
                      ...element.props
                    }
                  };
                }
                return (
                  <TdComp
                    key={key}
                    onClick={() => this.selectElement(enhancedElement.key)}
                  >
                    {enhancedElement}
                  </TdComp>
                );
              })}
            </TrComp>
            <TrComp>
              {this.props.elements.slice(8, 12).map((element, key) => {
                let enhancedElement;
                if (
                  element.key ===
                  this.state.selectedElements[
                    this.state.selectedElements.length - 1
                  ]
                ) {
                  enhancedElement = {
                    ...element,
                    props: {
                      ...element.props,
                      active: true
                    }
                  };
                } else {
                  enhancedElement = {
                    ...element,
                    props: {
                      ...element.props
                    }
                  };
                }
                return (
                  <TdComp
                    key={key}
                    onClick={() => this.selectElement(enhancedElement.key)}
                  >
                    {enhancedElement}
                  </TdComp>
                );
              })}
            </TrComp>
          </TableBodyComp>
        </TableComp>
      </TrainingStageComp>
    );
  }
}

export default UserInputStage;
