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
      if(action.payload.stepsize === 'Linear') {
        return {
          ...state,
          stepsize: action.payload.stepsize,
          speed: 1.8
        };
      }
      if(action.payload.stepsize === 'Half') {
        return {
          ...state,
          stepsize: action.payload.stepsize,
          speed: 2.25
        };
      }
      if(action.payload.stepsize === 'Smart') {
        return {
          ...state,
          stepsize: action.payload.stepsize,
          speed: 1.8
        };
      }
    case GO_TO_USER_ID_INPUT:
      return initialState;
    default:
      return { ...state };
  }
};

export default adaptation;
