import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { todoReducer } from './redux/todo' // Or wherever you keep your reducers

import TodoList from './components/TodoList.jsx'

const store = createStore( todoReducer );

ReactDOM.render(
  <Provider store={store}>
    <TodoList />
  </Provider>,
  document.getElementById('root')
)

