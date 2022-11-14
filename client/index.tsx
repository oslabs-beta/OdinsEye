import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { addNamespaces } from './getData';

const container = document.getElementById('root');

// @ts-ignore
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
