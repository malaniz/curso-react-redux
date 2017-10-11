import React from 'react';
import { connect } from 'react-redux';
import { addTodo, toggleTodo } from '../redux/todo';


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
    this.props.agregar(this.state.text);
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
    const { todos } = this.props;
    return (
      <div>
        <input type="text" value={this.state.text} onChange={this.onChange} />
        <button onClick={this.add}> Agregar </button>
        <br />
        <ul>
          { todos.map(
            (x, idx) => {
              if (x.completed) {
                return <li key={idx}>
                  <i>{x.text} </i>
                </li>
              } else {
                return <li key={idx}>
                  {x.text}
                   <button onClick={() => {
                      console.log("completed " + idx);
                      this.props.listo(idx);
                    }}> Completed? </button>
                </li>

              }
            }
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ todos: state });
const mapActionsToProps = {
  agregar: (text) => addTodo(text),
  listo: (index) => toggleTodo(index)
}

export default connect(mapStateToProps, mapActionsToProps)(TodoList);
