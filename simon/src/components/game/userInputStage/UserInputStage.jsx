import React, { Component } from "react";

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
  getEnrichedResults
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
    };
    this.clicking = new Audio(click);
  }

  componentWillMount() {
    this.setState({ startTime: Date.now() });
  }

  nextRound() {
    this.props.onNextRound();
    this.props.onSetNewSpeed(this.props.speed, this.props.stepsize);
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
    if (
      this.props.round === 9 ||
      this.props.speed === 125
    ) {
      this.props.onShowResults();
      return;
    }
    this.nextRound();
    return
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
      <TrainingStageComp id="box">
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
