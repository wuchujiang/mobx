import { observable, action, reaction } from 'mobx';

const initData = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 20, y: 0 }, { x: 30, y: 0 }];
export default class Snack {
  constructor(root) {
    this.root = root;
  }

  @observable list = [...initData];

  @action setList(list) {
    this.list = list;
  }

  dispose = reaction(() => this.list[this.list.length - 1], ({ x, y }) => {
    if (this.root.food.list.some(item => item.x === x && item.y === y)) {
      this.root.food.setList(this.root.food.list.filter(item => item.x !== x || item.y !== y));
      const { direction } = this.root;
      if (direction === 'left') {
        this.setList(this.list.concat({ x: x - 10, y }));
      } else if (direction === 'top') {
        this.setList(this.list.concat({ x, y: y - 10 }));
      } else if (direction === 'right') {
        this.setList(this.list.concat({ x: x + 10, y }));
      } else {
        this.setList(this.list.concat({ x, y: y + 10 }));
      }
    }
  });

}