import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../redux/todo';


class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: ""
    }
    this.onChange = this.onChange.bind(this);
    this.add = this.add.bind(this);
  }

  add() {
    this.props.addText(this.state.text);
    console.log(this.props);
    this.setState({
      text: ""
    });
  }

  onChange(e) {
    this.setState({
      text: e.target.value
    });
  }
  render () {
    return (
      <div>
        <input type="text" value={this.state.text} onChange={this.onChange} />
        <button onClick={this.add}> Agregar </button>
        <br />
        <ul>
          { this.props.todos.map(
            (x, idx) => <li key={idx}> {x.text} </li>
          )}
        </ul>
      </div>
    )
  }
}


export default connect(
  (state) => { 
    return { todos: state }
  },
  { 
    addText: (text) => addTodo(text)
  }
)(TodoList);
