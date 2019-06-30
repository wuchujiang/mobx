import { observable, computed, reaction, action } from 'mobx';

const initData = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 20, y: 0 }, { x: 30, y: 0 }];

class Snack {
  constructor(root) {
    this.root = root;
  }
  @observable list = [...initData];

  @action setList(list) {
    this.list = list;
  }

  // 🐍吃食物
  dispose = reaction(() => this.list[this.list.length - 1], ({ x, y }) => {
    if (this.root.food.list.some(item => item.x === x && item.y === y)) {
      this.list.push({ x, y });
      this.root.food.setList(this.root.food.list.filter(item => item.x !== x || item.y !== y));
    }
  });
}

export default Snack;