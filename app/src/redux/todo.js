const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const CANCEL_TODO = 'CANCEL_TODO';
const UP_TODO = 'UP_TODO';

export const addTodo = (text) => ({
  type: ADD_TODO,
  text
})

export const cancelTodo = (index) => ({
  type: CANCEL_TODO,
  index
})

export const toggleTodo = (index) => ({
  type: TOGGLE_TODO,
  index
})

export const upTodo = (index) => ({
  type: UP_TODO,
  index
})

export const todoReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([{ text: action.text, completed: false, value: 0}])
    case CANCEL_TODO:
      return state.slice(0, action.index).concat(state.slice(action.index+1))
    case TOGGLE_TODO:
      return state.map((x, index) => (
        index === action.index ? Object.assign({x, completed: true}) : x
      ));
    case UP_TODO:
      return state.map((x,index) => (
        index === action.index ? Object.assign({x,value: x.value+1}) : x
      ));
    default:
      return state;
  }
}
