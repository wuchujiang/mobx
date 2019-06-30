import { observable, computed, reaction, action } from 'mobx';

class Food {
  @observable list = [];

  constructor(root) {
    this.root = root;
    this.createFood(5);
  }

  @action createFood(num) {
    const array = [];
    while (array.length < num) {
      const temp = {
        x: Math.round(Math.random() * 79) * 10,
        y: Math.round(Math.random() * 39) * 10,
      }
      if (
        array.some(row => row.x === temp.x && row.y === temp.y) ||
        this.root.snack.list.some(row => row.x === temp.x && row.y === temp.y)
      ) {
        continue;
      } else {
        array.push(temp);
      }
    }
    this.list = array;
  }

  @action setList(list) {
    this.list = list
  }

  dispose = reaction(() => this.list.length, (len) => {
    if (len === 0) {
      this.root.status = 'over';
      alert('success');
    }
  })
}

export default Food;