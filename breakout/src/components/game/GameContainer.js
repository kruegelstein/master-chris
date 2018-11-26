import { connect } from "react-redux";

// Components
import Game from "./Game.jsx";

// Actions
import {
  setNewSpeed,
  saveRound,
  goToResults,
  saveClick,
  resetClicks
} from "../../actions/actions.js";

const mapStateToProps = state => ({
  userId: state.user.id,
  speed: state.adaptation.speed,
  round: state.adaptation.round,
  isResults: state.navigation.results,
  clicks: state.user.clicks,
  stepsize: state.adaptation.stepsize
});

const mapDispatchToProps = dispatch => ({
  onSetNewSpeed: stepsize => {
    dispatch(setNewSpeed(stepsize));
  },
  onSaveRound: (round, destroyedBricks, losses, clicks, stepsizeProperty) => {
    dispatch(
      saveRound(round, destroyedBricks, losses, clicks, stepsizeProperty)
    );
  },
  goToResults: () => {
    dispatch(goToResults());
  },
  saveClick: click => {
    dispatch(saveClick(click));
  },
  resetClicks: () => {
    dispatch(resetClicks());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
