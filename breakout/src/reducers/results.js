// Constants
import {
  SAVE_ROUND,
  SET_STEP_SIZE,
  GO_TO_USER_ID_INPUT
} from "../constants/ActionTypes.js";

const initialState = {
  stepsize: ""
};

export const results = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_STEP_SIZE:
      return {
        ...state,
        stepsize: action.payload.stepsize
      };
    case SAVE_ROUND: {
      console.log("###", action.payload);
      const stepsizeProperty = action.payload.stepsizeProperty;
      return {
        ...state,
        [action.payload.round]: {
          results: {
            destroyedBricks: action.payload.destroyedBricks,
            losses: action.payload.losses,
            clicks: action.payload.clicks
          },
          speed: stepsizeProperty
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
