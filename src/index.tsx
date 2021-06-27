import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './pages/app/App';
import { history, store } from './store';
import { Router } from 'react-router';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
