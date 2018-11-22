// Constants
import {
  WRITE_TO_RESULTS,
  GO_TO_USER_ID_INPUT
} from "../constants/ActionTypes.js";

const initialState = {};

export const results = (state = initialState, action = {}) => {
  switch (action.type) {
    case WRITE_TO_RESULTS: {
      const stepProperty = action.payload.stepsizeProperty;
      return {
        ...state,
        [action.payload.round]: {
          results: action.payload.results,
          speed: stepProperty
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
