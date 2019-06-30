import React from 'react';
import { computed, action } from 'mobx';
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

  @computed get snackList() {
    return game.snack.list;
  }

  @computed get foodList() {
    return game.food.list;
  }

  checkStatus = ({ x, y }) => {
    const eatMySelf = this.snackList.some((item, index, current) => item.x === x && item.y === y && index !== current.length - 1);
    if (x < 0 || x > 790 || y < 0 || y > 390 || eatMySelf) {
      game.status = 'over';
      alert('game over');
      return false;
    }
    return true
  }

  start = () => {
    const { direction, status } = game;
    const { x, y } = this.snackList[this.snackList.length - 1];
    let temp = {};

    switch (direction) {
      case 'right':
        temp = {
          x: x + 10,
          y,
        }
        break;
      case 'bottom':
        temp = {
          x,
          y: y + 10,
        }
        break;
      case 'left':
        temp = {
          x: x - 10,
          y,
        }
        break;
      case 'top':
        temp = {
          x,
          y: y - 10,
        }
        break;
      default: ;
    }

    if (status === 'over' || !this.checkStatus(temp)) {
      return;
    }
    const newSnackList = this.snackList.map((item, index, current) => index !== current.length - 1 ? current[index + 1] : temp);

    game.snack.setList(newSnackList);

    this.timer = setTimeout(this.start, game.speed);
  }

  run = (e) => {
    e.preventDefault();
    this.start();
  }


  render() {
    return (
      <div className="game">
        <div className="game-info">
          <h2>贪吃蛇</h2>
          <div className="game-info-control">
            <button onClick={game.status === 'stop' ? this.run : this.pause} >{game.status === 'stop' ? '开始游戏' : '暂停'}</button>
            <button onClick={this.restart}>重新开始</button>
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