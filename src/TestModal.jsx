import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import TestChild from './TestChild';

@inject('time', 'todo')
@observer
class TestModal extends Component {
  render() {
    console.log(this.props.todo.todo);
    const { count, add, len } = this.props.time;
    const { todo, addTodo } = this.props.todo;
    return (
      <div>
        {count}
        <button onClick={() => { add(); addTodo(1); }}>add</button>
        <TestChild time={this.props.time} />
        {todo.join(',')}
        len: {len}
      </div>
    )
  }
}

export default TestModal;
