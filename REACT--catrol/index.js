import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/styles.scss';
import App from './Views/App';
import './Fonts/CastrolSansGR_Regular.woff'
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

if ("ontouchstart" in document.documentElement) {
  document.querySelector('html').classList.add('is-touched')
}

// TODO: Uncoment below for long touch press
// window.oncontextmenu = () => {
//   return false
// }

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
