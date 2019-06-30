import { observable, autorun, reaction, computed, action, intercept, } from 'mobx';
import Snack from './Snack';
import Food from './Food';

class Game {
  constructor() {
    this.snack = new Snack(this);
    this.food = new Food(this);
  }
  // 方向默认向右
  @observable direction = 'right';

  @observable score = 0

  @observable speed = 250;

  @observable status = 'stop';

  @computed get snackList() {
    return this.snack.list;
  }

  @computed get foodList() {
    return this.food.list;
  }

  @action setDirection = (direction) => {
    this.direction = direction;
  }

  @action restart = () => {
    this.snack.reset();
    this.food.reset();
    this.status = 'stop';
    this.direction = 'right';
  }

  // 拦截方向，不允许开倒车
  dispose = intercept(this, 'direction', (change) => {
    if (
      (this.direction === 'left' && change.newValue === 'right') ||
      (this.direction === 'top' && change.newValue === 'bottom') ||
      (this.direction === 'right' && change.newValue === 'left') ||
      (this.direction === 'bottom' && change.newValue === 'top')
    ) {
      return null;
    }
    return change;
  });

  @action setSpeed(x) {
    this.speed = 250 * (1 - x);
  }
}

export default new Game();