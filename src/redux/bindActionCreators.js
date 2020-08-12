export default function bindActionCreators(actions, dispatch) {
  let boundActionCreators = {};

  for (let key in actions) {
    boundActionCreators[key] = function (...args) {
      return dispatch(actions[key](...args));
    };
  }

  return boundActionCreators;
}
