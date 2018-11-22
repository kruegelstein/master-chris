import {
  SET_STEP_SIZE,
  GO_TO_USER_ID_INPUT,
  NEXT_ROUND,
  HIT_ELEMENT
} from "../constants/ActionTypes.js";

const initialState = {
  stepsize: "",
  round: 1
};

export const adaptation = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_STEP_SIZE:
      return {
        ...state,
        stepsize: action.payload.stepsize
      };
    case NEXT_ROUND:
      return {
        ...state,
        round: state.round + 1
      };
    case GO_TO_USER_ID_INPUT:
      return initialState;
    default:
      return { ...state };
  }
};

export default adaptation;
