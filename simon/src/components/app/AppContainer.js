//

import { connect } from "react-redux";

// Components
import App from "./App.jsx";

// Actions
import { writeElementsToState, saveClick } from "../../actions/actions.js";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onWriteElementsToState: elements => {
    dispatch(writeElementsToState(elements));
  },
  saveClick: click => {
    dispatch(saveClick(click));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
