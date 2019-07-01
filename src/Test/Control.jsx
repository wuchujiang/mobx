import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('time')
@observer
class Control extends Component {

  add() {
    const aa = this.props.time;
    aa.plus();
  }

  less = () => {
    this.props.time.subtract();
  }
  render() {
    return (
      <div>
        <button onClick={() => this.add()}>加+</button>
        <button onClick={this.less}>减-</button>
      </div>
    )
  }
}

export default Control;
