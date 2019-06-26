import React, { Component } from 'react'
import { observer } from 'mobx-react';

@observer
class TestChild extends Component {
  render() {
    console.log('child-------render');
    return (
      <div>
        counter
        {this.props.time.count}
      </div>
    )
  }
}

export default TestChild;
