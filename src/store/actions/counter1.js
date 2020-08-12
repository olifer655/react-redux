import * as Types from '../action.type';
function add() {
  // return store.dispatch({type: Types.ADD})
  console.log('add1');
  return { type: Types.ADD1 };
}

function minus() {
  return { type: Types.MINUS1 };
}

export default { add, minus };
