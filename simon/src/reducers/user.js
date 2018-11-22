// Constants
import {
  SET_USER_ID,
  SET_NEW_SPEED,
  GO_TO_USER_ID_INPUT,
  SET_STEPSIZE,
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
  clicks: []
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
        clicks: []
      };
    case SET_STEPSIZE:
      return {
        ...state,
        stepsize: action.payload.stepsize
      };
    case GO_TO_USER_ID_INPUT:
      return initialState;
    case SET_NEW_SPEED:
      const currentSpeed = action.payload.currentSpeed;
      const newSpeed = getNewSpeed(currentSpeed);
      return {
        ...state,
        speed: newSpeed
      };
    default:
      return { ...state };
  }
};

export default user;
