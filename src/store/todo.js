import { observable, action, computed } from 'mobx';

class Todo {
  @observable todo = [];
  @action addTodo = (item) => {
    this.todo.push(item);
  }
}

export default new Todo();