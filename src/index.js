import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(burgerBuilderReducer,composeEnhancers(
  applyMiddleware(thunk)
));
const app = (
  <Provider store = {store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
  </Provider>
)
ReactDOM.render(
  // <React.StrictMode>
  app,
  // {/* </React.StrictMode>, */}
  document.getElementById('root')
);

serviceWorker.unregister();
