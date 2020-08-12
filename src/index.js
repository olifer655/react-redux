import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import store from './store';
import Counter1 from './component/counter1.js';
import Counter2 from './component/counter2.js';

ReactDOM.render(
  <Provider store={store}>
    <Counter1 />
    <Counter2 />
  </Provider>,
  document.getElementById('root')
);
