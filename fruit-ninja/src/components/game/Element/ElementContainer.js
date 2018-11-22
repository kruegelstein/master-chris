import { connect } from "react-redux";

// Wrapped component
import Element from "./Element.jsx";

// Actions
import { hitElement, missElement } from "../../../actions/actions.js";

const mapStateToProps = state => ({
  round: state.adaptation.round
});

const mapDispatchToProps = dispatch => ({
  hitElement: key => {
    dispatch(hitElement(key));
  },
  missElement: key => {
    dispatch(missElement(key));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Element);
