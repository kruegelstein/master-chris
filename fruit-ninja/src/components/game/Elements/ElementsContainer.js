import { connect } from "react-redux";

// Wrapped component
import Elements from "./Elements.jsx";

// Actions
import {
  saveRound,
  goToResults,
  nextRound,
  resetClicks,
  resetHitsAndMisses,
  createElement
} from "../../../actions/actions.js";

const mapStateToProps = state => ({
  round: state.adaptation.round,
  gameStarted: state.game.started,
  hits: state.game.hits,
  misses: state.game.misses,
  clicks: state.user.clicks,
  elements: state.game.elements
});

const mapDispatchToProps = dispatch => ({
  onSaveRound: (round, hits, misses, clicks, dimensionProperty) => {
    dispatch(saveRound(round, hits, misses, clicks, dimensionProperty));
  },
  onNextRound: () => {
    dispatch(nextRound());
  },
  goToResults: () => {
    dispatch(goToResults());
  },
  resetClicks: () => {
    dispatch(resetClicks());
  },
  resetHitsAndMisses: () => {
    dispatch(resetHitsAndMisses());
  },
  createElement: id => {
    dispatch(createElement(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Elements);
