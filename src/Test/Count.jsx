import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('time')
@observer
class Control extends Component {
  render() {
    return (
      <div>
        数字{this.props.time.count}
      </div>
    )
  }
}

export default Control;
