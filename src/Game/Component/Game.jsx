import React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import game from '../Store/game';
import Snack from './Snack';
import Food from './Food';
import './game.scss';

const enumDirection = {
  37: 'left',
  38: 'top',
  39: 'right',
  40: 'bottom',
}

@observer
class SnackGame extends React.Component {
  componentDidMount() {
    const ctx = this.canvas.getContext('2d');
    ctx.width = 800;
    ctx.height = 400;
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 0.5;
    for (let i = 10; i < 800; i += 10) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 800);
      ctx.stroke();
    }

    for (let i = 10; i < 800; i += 10) {
      ctx.moveTo(0, i);
      ctx.lineTo(798, i);
      ctx.stroke();
    }

    document.body.onkeyup = function (e) {
      const { keyCode } = e;
      if (keyCode > 40 || keyCode < 37) {
        return;
      }
      game.setDirection(enumDirection[keyCode]);
    }
  }

  pause = () => {
    clearTimeout(this.timer);
    game.status = 'stop';
  }

  @computed get snackList() {
    return game.snack.list;
  }

  @computed get foodList() {
    return game.food.list;
  }

  check = ({ x, y }) => {
    const hasEatMyself = this.snackList.some((item, index, current) => item.x === x && item.y === y && index !== current.length - 1);
    if (x > 790 || x < 0 || y > 390 || y < 0 || hasEatMyself) {
      clearTimeout(this.timer);
      game.setStatus('over');
      alert('game over');
      return false;
    }
    return true;
  }

  start = () => {
    let temp = {};
    const { direction, status } = game;
    const { snackList } = this;
    if (status === 'over') {
      return;
    }
    const { x, y } = snackList[snackList.length - 1];
    if (direction === 'left') {
      temp = {
        x: x - 10,
        y,
      }
    } else if (direction === 'top') {
      temp = {
        x,
        y: y - 10,
      }
    } else if (direction === 'right') {
      temp = {
        x: x + 10,
        y,
      }
    } else {
      temp = {
        x,
        y: y + 10,
      }
    }

    const newSnackList = snackList
      .map((item, index, current) =>
        current.length - 1 === index
          ? temp
          : current[index + 1]);

    if (!this.check(temp)) {
      return false;
    }
    game.snack.setList(newSnackList);
    this.timer = setTimeout(this.start, game.speend);
  }

  run = (e) => {
    e.preventDefault();
    game.setDirection('run');
    clearTimeout(this.timer);
    this.start();
  }

  render() {
    return (
      <div className="game">
        <div className="game-info">
          <h2>贪吃蛇</h2>
          <div className="game-info-control">
            <button onClick={game.status === 'stop' ? this.run : this.pause} >{game.status === 'stop' ? '开始游戏' : '暂停'}</button>
            <button onClick={this.restart}>重新开始2</button>
          </div>
        </div>
        <div className="game-canvas">
          <canvas width="800px" height="400px" className="canvas" ref={node => this.canvas = node}></canvas>
          <Snack snackList={this.snackList} />
          <Food foodList={this.foodList} />
        </div>
      </div>
    )
  }
}

export default SnackGame;