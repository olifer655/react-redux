/**
 * connect
 * 连接 React 组件与 Redux store。
 * 连接操作不会改变原来的组件类。
 * 反而返回一个新的已与 Redux store 连接的组件类。
 * 1. 获取组件上下文
 * 2. 监听变化，并通知各个组件变更
 * 3. 将action绑定给 oldComponent
 * 4. 将getState,mapStateToProps数值绑定给 oldComponent
 */
import { ReactReduxContext } from 'react-redux';
import React, { useContext, useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';

export default function (mapStateToProps, mapDispatchToProps) {
  return function (OldComponent) {
    return function (props) {
      let { store } = useContext(ReactReduxContext);
      let [state, setState] = useState(store.getState());

      useEffect(() => {
        return store.subscribe(() => {
          setState(mapStateToProps(store.getState()));
        });
      }, []);

      let bindActions = bindActionCreators(mapDispatchToProps, store.dispatch);

      return <OldComponent {...state} {...bindActions} />;
    };
  };
}
