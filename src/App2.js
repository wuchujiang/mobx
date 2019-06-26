import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import TestModal from './TestModal';
import store from './store';
console.log(store);

export default class App2 extends Component {
  render() {
    return (
      <Provider {...store}>
        <TestModal />
      </Provider>
    )
  }
}
