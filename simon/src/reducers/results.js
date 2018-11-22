// Constants
import {
  WRITE_TO_RESULTS,
  GO_TO_USER_ID_INPUT,
  SET_STEPSIZE
} from "../constants/ActionTypes.js";

const initialState = {
  stepsize: ""
};

export const results = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_STEPSIZE:
      return {
        ...state,
        stepsize: action.payload.stepsize
      };
    case WRITE_TO_RESULTS: {
      const dimensionProperty = action.payload.dimensionProperty;
      return {
        ...state,
        [action.payload.round]: {
          results: action.payload.results,
          [state.dimension]: dimensionProperty
        }
      };
    }
    case GO_TO_USER_ID_INPUT:
      return initialState;
    default:
      return { ...state };
  }
};

export default results;
