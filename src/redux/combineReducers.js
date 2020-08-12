/**
let newState = {
  counter1: {number1: 0},
  counter2: {number2: 0}
}
 */
export default function combineReducers(reducers) {
  let newState = {};
  return function (state = {}, actions) {
    for (let key in reducers) {
      let reducerForKey = reducers[key];
      let previousStateForKey = state[key];
      let nextStateForKey = reducerForKey(previousStateForKey, actions);
      newState[key] = nextStateForKey;
    }
    return newState;
  };
}
