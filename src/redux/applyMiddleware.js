/**
 * 中间件，本质就是一个重写dispatch的过程
 * action => dispatch(action)
 *
 * @param {*} middleware
 */
export default function (middleware) {
  return function (createStore) {
    return function (reducer) {
      let store = createStore(reducer);
      let dispatch;

      middleware = middleware({
        getState: store.getState,
        dispatch: (action) => dispatch(action),
      });

      dispatch = middleware(store.dispatch);
      return { ...store, dispatch };
    };
  };
}
