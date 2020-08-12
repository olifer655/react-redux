import React from 'react';
import { connect } from 'react-redux';

import actions from '../store/actions/counter1';

function Counter1(props) {
  return (
    <>
      <p>counter: {props.number}</p>
      <button onClick={props.add}>+</button>
      <button onClick={props.minus}>-</button>
    </>
  );
}

let mapStateToProps = (state) => {
  console.log(state);
  return state.counter1;
};

export default connect(mapStateToProps, actions)(Counter1);
