import { observable, autorun, reaction, computed, action, configure, when, } from 'mobx';
import { reset } from '_ansi-colors@3.2.4@ansi-colors';

class Food {
  @observable list = [];

  constructor(root) {
    // 初始化时随机生成5个食物
    this.root = root;
    this.createFood(3);
  }

  @action createFood(num) {
    // 随机生成10个
    const array = [];
    while (array.length < num) {
      let temp = {
        x: Math.round(Math.random() * 79) * 10,
        y: Math.round(Math.random() * 39) * 10,
      }

      // 避免生成的食物跟🐍的位置重复
      // 避免食物坐标重复
      if (
        array.some(item => item.x === temp.x && item.y === temp.y) ||
        this.root.snack.list.some(item => item.x === temp.x && item.y === temp.y)) {
        continue;
      } else {
        array.push(temp);
      }
    }
    this.list = array;
  }

  dispose = reaction(() => this.list.length, (len) => {
    if (len === 0) {
      alert('success');
      this.root.status = 'stop';
    }
  })

  @action setList(list) {
    this.list = list;
  }

  @action reset() {
    this.createFood(30);
  }
}

export default Food;