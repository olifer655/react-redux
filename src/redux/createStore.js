export default function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());

    return action;
  }
  // 给初始化状态赋值
  dispatch({ type: '@@REDUX_INIT' });
  function subscript(listener) {
    listeners.push(listener);

    return function () {
      // 返回一个取消订阅的函数
      let index = listener.indexOf(listeners);
      listeners.splice(index, 1);
    };
  }

  return {
    getState,
    dispatch,
    subscript,
  };
}
