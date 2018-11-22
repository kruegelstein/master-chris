import {
  SET_USER_ID,
  SET_STEP_SIZE,
  SAVE_ROUND,
  GO_TO_RESULTS,
  STORE_IN_DB,
  STORE_IN_DB_SUCCESS,
  STORE_IN_DB_ERROR,
  GO_TO_USER_ID_INPUT,
  NEXT_ROUND,
  CHANGE_ACTIVE_ROWS,
  START_GAME,
  SAVE_CLICK,
  RESET_CLICKS,
  RESET_HITS_AND_MISSES,
  HIT_ELEMENT,
  MISS_ELEMENT,
  CREATE_ELEMENT
} from "../constants/ActionTypes.js";

import { firebaseApp } from "../firebase.js";

export const submitUserId = id => ({ type: SET_USER_ID, payload: { id } });
export const selectStepsize = stepsize => ({
  type: SET_STEP_SIZE,
  payload: { stepsize }
});
export const goToResults = () => ({ type: GO_TO_RESULTS, payload: {} });

export const goToUserIdInput = () => ({
  type: GO_TO_USER_ID_INPUT,
  payload: {}
});

export const resetClicks = () => ({
  type: RESET_CLICKS,
  payload: {}
});

export const createElement = id => ({
  type: CREATE_ELEMENT,
  payload: { id }
});

export const hitElement = key => ({
  type: HIT_ELEMENT,
  payload: { key }
});

export const missElement = key => ({
  type: MISS_ELEMENT,
  payload: { key }
});

export const resetHitsAndMisses = () => ({
  type: RESET_HITS_AND_MISSES,
  payload: {}
});

export const saveClick = click => ({ type: SAVE_CLICK, payload: { click } });

export const startGame = () => ({ type: START_GAME, payload: {} });

export const changeActiveRows = activeRows => ({
  type: CHANGE_ACTIVE_ROWS,
  payload: { activeRows }
});

export const saveRound = (round, hits, misses, clicks, stepsizeProperty) => ({
  type: SAVE_ROUND,
  payload: { round, hits, misses, clicks, stepsizeProperty }
});

export const nextRound = () => ({
  type: NEXT_ROUND,
  payload: {}
});

// Actions to backend (firebase)
export const submitResultsToDB = (
  results,
  userId,
  callback = null
) => dispatch => {
  dispatch(storeInDB(results));
  return firebaseApp
    .database()
    .ref(`/${userId}`)
    .set({ results })
    .then(
      r => {
        if (callback) {
          callback(true, r);
        }
        dispatch(storeInDBSuccess(r));
      },
      e => {
        if (callback) {
          callback(false, e);
        }
        dispatch(storeInDBError(e));
      }
    );
};

// actions recieved by success or error
function storeInDB(results) {
  return {
    type: STORE_IN_DB,
    payload: results
  };
}

function storeInDBSuccess(result) {
  return {
    type: STORE_IN_DB_SUCCESS,
    payload: result
  };
}

function storeInDBError(error) {
  return {
    type: STORE_IN_DB_ERROR,
    payload: error
  };
}
