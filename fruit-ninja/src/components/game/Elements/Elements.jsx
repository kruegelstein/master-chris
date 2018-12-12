import React, { Component } from "react";

// Styled componets
import Element from "../Element/ElementContainer.js";

// Helper
import {
  getSpeed,
  getCoordinates
} from "../../../utils/helper.js";

// Interval to adapt is 10sec
const ADAPTION_INTERVAL = 10000;

class Elements extends Component {
  constructor(props) {
    super(props);
    this.adaptationInterval = null;
  }
  shouldComponentUpdate() {
    return false;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.gameStarted && nextProps.gameStarted) {
      this.createElements();

      this.adaptationInterval = setInterval(
        this.triggerAdaptation,
        ADAPTION_INTERVAL
      );
      return;
    }
    if (this.props.gameStarted && nextProps.elements.length === 0) {
      this.createElements();
    }

    if (nextProps.elements.length > this.props.elements.length) {
      this.forceUpdate();
    }
  }

  createElements = () => {
    const id = Math.floor(Math.random() * 10000000);
    this.props.createElement(id);
  };

  triggerAdaptation = () => {
    // Save results for the round
    this.saveResults();
    // Stop adapting after 10 rounds
    if (this.props.round === 9 || getSpeed(this.props.round, this.props.stepsize) === 200) {
      clearInterval(this.adaptationInterval);
      this.props.goToResults();
      return;
    }
    this.next();
    return
  };

  next() {
    this.props.onNextRound();
  }

  saveResults = () => {
    this.saveRound();
    this.props.resetClicks();
    this.props.resetHitsAndMisses();
  };

  saveRound = () => {
    const { hits, misses, clicks, round, stepsize } = this.props;
    const stepsizeProperty = getSpeed(round, stepsize);

    this.props.onSaveRound(round, hits, misses, clicks, stepsizeProperty);
  };

  render() {
    const coordinates = getCoordinates(this.props.elements);
    if (this.props.gameStarted) {
      return (
        <div>
          {this.props.elements.map((element, index) => {
            const xCoordinate = coordinates[index];
            return (
              <Element
                key={element}
                elementId={element}
                xCoordinate={xCoordinate}
              />
            );
          })}
        </div>
      );
    }
    return null;
  }
}

export default Elements;
