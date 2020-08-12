import * as TYPES from '../action.type';
const initialState = { number: 0 };
export default function (state = initialState, action) {
  switch (action.type) {
    case TYPES.ADD1:
      return { number: state.number + 1 };
    case TYPES.MINUS1:
      return { number: state.number - 1 };
    default:
      return state;
  }
}
