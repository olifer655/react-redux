## redux

redux 经常和 React Router 和 react-redux 一起连用

一个计数器组件，在只用 redux 的时候是这样实现的：

``` js
// store.js
import { createStore } from 'redux';
import reducers from './reducers.js';

export default createStore(reducers);

// reducers.js
import * as TYPES from './action.type';
const initialState = {
    number: 0
};
export default function(state = initialState, action) {
    switch (action.type) {
        case TYPES.ADD:
            return {
                number: state.number + 1
            };
        case TYPES.MINUS:
            return {
                number: state.number - 1
            };
        default:
            return state;
    }
}

// action.type
export const ADD = 'ADD';
export const MINUS = 'MINUS';

// actions.js
import * as Types from './action.type';

function add() {
  return {
    type: Types.ADD1
  };
}

function minus() {
  return {
    type: Types.MINUS1
  };
}

export default {
    add,
    minus
};

// counter.js
import React, {
  useState,
  useEffect
} from 'react';
import store from './store';
import actions from './store/actions';
import {
  bindActionCreators
} from 'redux';

let bindActions = bindActionCreators(actions, store.dispatch);

export default function Counter() {
  let [number, setNumber] = useState(store.getState().number);

  useEffect(() => {
    return store.subscribe(() => {
      setNumber(store.getState().number);
    });
  }, []);

  return (
    <>
      <p>counter: {number}</p>
      <button onClick={bindActions.add}>+</button>
      <button onClick={bindActions.minus}>-</button>
    </>
  );
}
```

我们需要引入 `bindActionCreators` 将 action和store相结合。简化我们action的使用。

如果不使用bindActionCreators，button是这样的：

```js
...
return (
  <>
    <p>counter: {number}</p>
    <button onClick={() => {store.dispatch({type: Types.ADD})}}>+</button>
    <button onClick={() => {store.dispatch({type: Types.MINUS})}}>-</button>
  </>
);
....
```

使用 react-redux 可以大大减少我们编写组件时候的成本

```jsx
import React from 'react';
import { connect } from 'react-redux';

import actions from '../store/actions/counter1';
import { bindActionCreators } from 'redux';

function Counter1(props) {
  return (
    <>
      <p>counter: {props.number}</p>
      <button onClick={props.add}>+</button>
      <button onClick={props.minus}>-</button>
    </>
  );
}

let mapStateToProps = (state) => state.counter1;

export default connect(mapStateToProps, actions)(Counter1);

```

在引入react-redux后，我们无需手动引入store，上下问内容和监听组件变化了，只需通过 `connect` ，`connect`会自动将当前属性值和store的内容绑定到组件内部，我们只需要从props中获取即可。 `connect` 同时在背后默默替我们监听属性的变化，并通知更改。

connect 的其实是把我们公用的部分进行了抽离

```jsx
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
```

## redux 中间件

如果没有redux 中间件，redux 的工作流程是这样的： action => reducer, 这相当于同步操作，由dispatch 触发action 后， 直接去reducer执行相应的动作

但在有些比较复杂的情况下，这种同步无法很好的解决我们的问题，比如点击按钮 -> 获取服务器的数据 -> 渲染视图，因为获取数据是异步的，所以我们需要引入中间件来改变redux的同步流程，实现 action => middleware => reducer， 点击按钮相当于dispatch 触发action， 然后middleware开始工作，获取数据后触发reducer渲染视图。

中间件让我们可以改变数据流，实现异步、日志、错误处理等。