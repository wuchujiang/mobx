import React, { Component } from 'react';
import Game from './Game/Component/Game';
import App2 from './App2';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game />
        {/* <App2 /> */}
      </div>
    );
  }
}

export default App;
