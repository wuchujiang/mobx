import React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import game from '../Store/Game';
import Snack from './Snack';
import Food from './Food';
import './game.scss';

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

    // 绑定键盘事件
    document.body.onkeydown = function (e) {
      // 有事件对象就用事件对象，没有就自己创建一个，兼容低版本浏览器
      var ev = e || window.event;
      let direction = '';
      if (ev.keyCode < 37 || ev.keyCode > 40) {
        return;
      }
      switch (ev.keyCode) {
        case 38:
          direction = "top";
          break;
        case 40:
          direction = "bottom";
          break;
        case 37:
          direction = "left";
          break;
        case 39:
          direction = "right";
          break;
        default:
          return;
      }
      if (direction === game.direction) {
        return;
      }
      game.setDirection(direction);
    };
  }

  @computed get snackList() {
    return game.snackList;
  }

  @computed get foodList() {
    return game.foodList;
  }

  // 碰撞检测
  hasCollision = ({ x, y }) => {
    // 超出边界
    if (x < 0 || x > 790 || y < 0 || y > 390) {
      alert('game over');
      clearTimeout(this.timer);
      return true;
    }

    // 头跟身子相撞
    if (this.snackList.some((item, index, current) => item.x === x && item.y === y && index !== current.length - 1)) {
      alert('game over');
      clearInterval(this.timer);
      return true;
    }
    return false;
  }

  runData = () => {
    if (game.status === 'stop') {
      return;
    }
    clearTimeout(this.timer);
    const { direction, snackList } = game;
    let temp = {};
    const headPoint = snackList[snackList.length - 1];
    switch (direction) {
      case 'right':
        temp = {
          x: headPoint.x + 10,
          y: headPoint.y,
        }
        break;
      case 'top':
        temp = {
          x: headPoint.x,
          y: headPoint.y - 10,
        }
        break;
      case 'bottom':
        temp = {
          x: headPoint.x,
          y: headPoint.y + 10,
        }
        break;
      case 'left':
        temp = {
          x: headPoint.x - 10,
          y: headPoint.y,
        }
        break;
      default:
    }

    const newSnackList = snackList.map((row, index) => ({
      ...(index === snackList.length - 1 ? temp : snackList[index + 1]),
    }));

    if (this.hasCollision(temp)) {
      return;
    }

    if (this.foodList.length === 0) {
      alert('success');
      return;
    }

    game.snack.setList(newSnackList);
    this.timer = setTimeout(() => {
      this.runData();
    }, game.speed)
  }

  // 开始游戏
  run = (e) => {
    e.preventDefault();
    game.status = 'run';
    this.runData();
  }

  pause = () => {
    this.clear();
    clearTimeout(this.timer);
  }

  restart = () => {
    this.clear();
    game.restart();
  }

  clear = () => {
    clearTimeout(this.timer);
    game.status = 'stop';
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