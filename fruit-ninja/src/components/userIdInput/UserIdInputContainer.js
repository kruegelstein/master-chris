//

import { connect } from "react-redux";

// Wrapped component
import UserIdInput from "./UserIdInput.jsx";

// Actions
import { submitUserId, selectStepsize } from "../../actions/actions.js";

const mapStateToProps = state => ({
  userId: state.user.id
});

const mapDispatchToProps = dispatch => ({
  onStart: (id, stepsize) => {
    dispatch(submitUserId(id));
    dispatch(selectStepsize(stepsize));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserIdInput);
