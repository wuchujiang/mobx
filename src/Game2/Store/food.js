import { observable, computed, when, action } from 'mobx';

class Food {
  @observable list = [{ x: 0, y: 0 }];

  constructor(root) {
    this.root = root;
    this.createFood(30);
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
    this.list = list;
  }

  dispose = when(() => this.list.length === 0, () => {
    this.root.setStatus('over');
    alert('success');
  });
}

export default Food;