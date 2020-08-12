import React, { useState, useEffect } from 'react';
import store from '../store';
import actions from '../store/actions';
import { bindActionCreators } from 'redux';
console.log(store);
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
