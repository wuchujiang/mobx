import React, { Component } from 'react';
import { observable, action, reaction } from 'mobx';
import { observer } from 'mobx-react';
import Add from './Add';
import Remove from './Remove';
import store from './store';

@observer
class Text extends Component {
state = {
  one: 1
}

  @observable time = {
    
  };

  componentDidMount() {
    
  }

  @action
  click = () => {
    this.time = {
      name: 'tttttt',
      age: 20
    }
  }

  componentWillReact = () => {
    console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
  }



  render() {
    console.log('render father')
    return (
      <div>
        <button onClick={this.click}>click</button>
        <p>{this.time.name}</p>
        <Time count={this.time}/>
        <Add/>
        <Remove/>
        <hr/>
        <hr/>
        <button onClick={() => this.setState({one: 2})}>default click</button>
        <div>static state{this.state.one}</div>
        {store.list}
      </div>
    )
  }
}

export default Text;

const Time = ({count}) => <div>{count.age}</div>;
