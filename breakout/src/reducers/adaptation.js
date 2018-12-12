import {
  SET_NEW_SPEED,
  SET_STEP_SIZE,
  GO_TO_USER_ID_INPUT,
  SAVE_ROUND
} from "../constants/ActionTypes.js";

import { getNewSpeed } from "../utils/game.js";

const initialState = {
  stepsize: "",
  round: 0,
  speed: null
};

export const adaptation = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_NEW_SPEED:
      const newSpeed = getNewSpeed(state.speed, action.payload.stepsize, state.round);
      return {
        ...state,
        speed: newSpeed
      };
    case SAVE_ROUND:
      return {
        ...state,
        round: state.round + 1
      };
    case SET_STEP_SIZE:
      return {
        ...state,
        stepsize: action.payload.stepsize,
        speed: 3
      };
    case GO_TO_USER_ID_INPUT:
      return initialState;
    default:
      return { ...state };
  }
};

export default adaptation;
