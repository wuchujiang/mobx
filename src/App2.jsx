import React, { Component } from 'react';

import { Provider } from 'mobx-react'
import Test from './Test';
import store from './store';
export default class App2 extends Component {
  render() {
    return (
      <Provider {...store}>
        <Test />
      </Provider>
    )
  }
}
