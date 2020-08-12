/**
 * 仓库在接收到action之后，要把动作派发给次reducers处理
 * 原理大概如下：
 */

// export default function (){
//   let newState = {
//     counter1: {number1: 0},
//     counter2: {number2: 0}
//   }
//   newState.counter1 = reducer1({number1: 0})
//   newState.counter2 = reducer1({number2: 0})

//   return newState
// }

import { combineReducers } from 'redux';
import counter1 from './counter1';
import counter2 from './counter2';

export default combineReducers({
  counter1,
  counter2,
});
