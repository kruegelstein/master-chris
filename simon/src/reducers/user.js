// Constants
import {
  SET_USER_ID,
  SET_NEW_SPEED,
  GO_TO_USER_ID_INPUT,
  SET_STEP_SIZE,
  NEXT_ROUND,
  SAVE_CLICK
} from "../constants/ActionTypes.js";

// Helper
import { getNewSpeed } from "../utils/lightUp";

const initialState = {
  id: null,
  stepsize: "",
  speed: 2000,
  patternLength: 5,
  clicks: [],
  round: 0
};

export const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        id: action.payload.id
      };
    case SAVE_CLICK:
      return {
        ...state,
        clicks: state.clicks.concat([action.payload.click])
      };
    case NEXT_ROUND:
      return {
        ...state,
        points: 0,
        clicks: [],
        round: state.round + 1,
      };
    case SET_STEP_SIZE:
      return {
        ...state,
        stepsize: action.payload.stepsize
      };
    case GO_TO_USER_ID_INPUT:
      return initialState;
    case SET_NEW_SPEED:
      const currentSpeed = action.payload.currentSpeed;
      const stepsize = action.payload.stepsize;
      const newSpeed = getNewSpeed(currentSpeed, stepsize, state.round);
      return {
        ...state,
        speed: newSpeed
      };
    default:
      return { ...state };
  }
};

export default user;
