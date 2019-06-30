import { observable, reaction, action } from 'mobx';

const init = [
  {
    x: 0,
    y: 0,
  },
  {
    x: 10,
    y: 0,
  },
  {
    x: 20,
    y: 0,
  }, {
    x: 30,
    y: 0,
  }]

class Snack {

  constructor(root) {
    this.root = root;
  }
  // 方向默认向右
  @observable list = [...init]

  // 判断🐍吃食物
  dispose = reaction(() => this.list[this.list.length - 1], ({ x, y }) => {
    if (this.root.food.list.some(item => item.x === x && item.y === y)) {
      // 根据方向 计算食物的哪一个位置
      const { direction } = this.root;
      if (direction === 'top') {
        this.setList(this.list.concat({ x, y: y - 10 }));
      } else if (direction === 'right') {
        this.setList(this.list.concat({ x: x + 10, y }));
      } else if (direction === 'bottom') {
        this.setList(this.list.concat({ x, y: y + 10 }));
      } else {
        this.setList(this.list.concat({ x: x - 10, y }));
      }
      this.root.food.setList(this.root.food.list.filter(item => item.x !== x || item.y !== y));
    }
  });

  @action add(point) {
    this.list.push(point);
  }

  @action setList(list) {
    this.list = list;
  }

  @action reset() {
    this.list = [...init];
  }

  // 监听🐍长度的变化，动态调整计时器速度
  dispose2 = reaction(() => this.list.length, len => {
    const speed = (len - 5) * 0.03;
    this.root.setSpeed(speed);
  });
}

export default Snack;