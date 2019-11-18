import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import recipes from './store/reducers/recipes';
import ingredients from './store/reducers/ingredients';
import App from './App';

import "./styles.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

const rootReducer = combineReducers({
  recipes,
  ingredients
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
