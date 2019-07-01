import { observable, reaction, action, when } from 'mobx';

const initData = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 20, y: 0 }, { x: 30, y: 0 }];

class Snack {
  constructor(root) {
    this.root = root;
  }
  @observable list = [...initData];

  @action setList(list) {
    this.list = list;
  }

  @action reset() {
    this.list = [...initData];
  }

  // 🐍吃食物
  dispose = reaction(() => this.list[this.list.length - 1], ({ x, y }) => {
    if (this.root.food.list.some(item => item.x === x && item.y === y)) {
      const { direction } = this.root;
      if (direction === 'top') {
        this.list.push({ x, y: y - 10 });
      } else if (direction === 'right') {
        this.list.push({ x: x + 10, y });
      } else if (direction === 'bottom') {
        this.list.push({ x, y: y + 10 });
      } else {
        this.list.push({ x: x - 10, y });
      }
      this.root.food.setList(this.root.food.list.filter(item => item.x !== x || item.y !== y));
    }
  });

  dispose = when(() => this.list.length > 5, () => {
    this.root.speed = 250 * (1 - (this.list.length - 5) * 0.03);
  });
}

export default Snack;