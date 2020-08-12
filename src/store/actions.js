import * as Types from './action.type';
function add() {
  // return store.dispatch({type: Types.ADD})
  return { type: Types.ADD };
}

function minus() {
  return { type: Types.MINUS };
}

export default { add, minus };
