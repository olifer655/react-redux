import React, { useState, useEffect } from 'react';
import store from '../store/index';
import actions from '../store/actions/counter2';
import { bindActionCreators } from 'redux';

let bindActions = bindActionCreators(actions, store.dispatch);

export default function Counter2(props) {
  let [number, setNumber] = useState(store.getState().counter2.number);

  useEffect(() => {
    return store.subscribe(() => {
      setNumber(store.getState().counter2.number);
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
