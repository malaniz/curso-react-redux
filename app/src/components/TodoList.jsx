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
    console.log("estoy en add");
    this.props.addText(this.state.text);
    console.log(this.props);
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
          <li>Hola
          </li>
        </ul>
      </div>
    )
  }
}


export default connect(
  (state) => {
    console.log(state);
    return {
      todos: state
    }
  },
  { 
    addText: (text) => addTodo(text)
  }
)(TodoList);
