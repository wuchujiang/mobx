import React, { Component } from 'react';
import { observable } from 'mobx';
import axios from './axios';
import './mobx.scss';


class Store {
  @observable num = 1;
}

class App extends Component {
  componentDidMount = () => {
    axios.get('/list');
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
