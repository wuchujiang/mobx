import { observable, action, when } from 'mobx';

export default class Food {
  constructor(root) {
    this.root = root;
    this.createFood(30);
  }

  @observable list = [{ x: 0, y: 0 }];

  @action createFood(num) {
    const array = [];
    while (array.length < num) {
      const temp = {
        x: Math.round(Math.random() * 79) * 10,
        y: Math.round(Math.random() * 39) * 10,
      };

      if (
        array.some(item => item.x === temp.x && item.y === temp.y) ||
        this.root.snack.list.some(item => item.x === temp.x && item.y === temp.y)
      ) {
        continue;
      } else {
        array.push(temp);
      }
      this.list = array;
    }
  }

  @action setList(list) {
    this.list = list;
  }
  dispose = when(() => this.list.len === 0, () => {
    alert('success');
    this.root.setStatus('over');
  });
}