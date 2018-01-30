export const COUNTER_ADD = `counter.add`;
export const COUNTER_SUBTRACT = `counter.subtract`;
import {handleActions} from 'redux-actions';


//ACTIONS

export function add() {
  return (dispatch) => {
    dispatch({type: COUNTER_ADD});
  }
}

export function subtract() {
  return (dispatch) => {
    dispatch({type: COUNTER_SUBTRACT});
  }
}

//REDUCER
const initialState = {count: 0};

const reducer = handleActions({
  [COUNTER_ADD]: (state) => {
    return {count: state.count + 1}
  },
  [COUNTER_SUBTRACT]: (state) => {
    if (state.count > 0) {
      return {count: state.count - 1};
    } else {
      return state;
    }
  }
}, initialState);

export default reducer;


//SELECTORS

export const getCount = (state) => state.counter.count