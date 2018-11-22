//

import { connect } from "react-redux";

// Wrapped component
import UserInputStage from "./UserInputStage.jsx";

// Actions
import {
  showResults,
  nextRound,
  writeToResults,
  setNewSpeed,
  saveClick
} from "../../../actions/actions.js";

const mapStateToProps = state => ({
  elements: state.environment.elements,
  userInput: state.navigation.userInput,
  selectedElements: state.input.selected,
  round: state.navigation.round,
  currentRound: state.currentRound,
  showResults: state.navigation.results,
  results: state.results,
  speed: state.user.speed,
  patternLength: state.user.patternLength,
  clicks: state.user.clicks
});

const mapDispatchToProps = dispatch => ({
  onWriteToResults: (results, round, stepsizeProperty) => {
    dispatch(writeToResults(results, round, stepsizeProperty));
  },
  onNextRound: score => {
    dispatch(nextRound(score));
  },
  onShowResults: () => {
    dispatch(showResults());
  },
  onSetNewSpeed: currentSpeed => {
    dispatch(setNewSpeed(currentSpeed));
  },
  saveClick: click => {
    dispatch(saveClick(click));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInputStage);
