import React from 'react'
import ReactDOM from 'react-dom'

import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { phonesReducer } from './redux/phones'
import App from './components/App.jsx'

// Exported from redux-devtools

// unify reducers
const rootReducer = combineReducers({
  phones: phonesReducer
});


// create store with thunk middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

