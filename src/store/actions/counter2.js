import * as Types from '../action.type';
function add() {
  // return store.dispatch({type: Types.ADD})
  return { type: Types.ADD2 };
}

function minus() {
  return { type: Types.MINUS2 };
}

export default { add, minus };
