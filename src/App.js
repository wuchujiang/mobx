import React, { Component } from 'react';
import { observable, autorun, action, runInAction } from 'mobx';
import axios from './axios';
import './mobx.scss';


class Store {
  @observable num = 1;

  @observable arr = [1, 2, 3];

  @action.bound setArr() {
    this.arr.push(4);
  }

  @action sleep() {
    this.arr.push()
  }
}

autorun((s) => {
  console.log('run');
})

// axios.get('/list');
const store = new Store();
store.num = 3;
// const setArr = store.setArr;
// setArr();
store.sleep();

class App extends Component {
  componentDidMount = () => {

  }

  render() {
    return (
      <div className="App">
        test
      </div>
    );
  }
}

export default App;
