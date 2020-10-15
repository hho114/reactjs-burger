import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

const app = (
  <BrowserRouter>
  <App />
  </BrowserRouter>
)
ReactDOM.render(
  // <React.StrictMode>
  app,
  // {/* </React.StrictMode>, */}
  document.getElementById('root')
);

serviceWorker.unregister();
