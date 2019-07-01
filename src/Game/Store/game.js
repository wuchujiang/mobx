import { observable, action, intercept } from 'mobx';
import Food from './food';
import Snack from './snack';

class Game {

  constructor() {
    this.snack = new Snack(this);
    this.food = new Food(this);
  }


  @observable time = [1, 2, 3]

  @observable direction = 'right';
  @observable status = 'stop';
  @observable speend = 250;
  @action setDirection(direction) {
    this.direction = direction;
  }

  @action setStatus(status) {
    this.status = status;
  }

  dispose = intercept(this, 'direction', (change) => {
    const { newValue } = change;
    if (
      newValue === 'left' && this.direction === 'right' ||
      newValue === 'top' && this.direction === 'bottom' ||
      newValue === 'right' && this.direction === 'left' ||
      newValue === 'bottom' && this.direction === 'top'
    ) {
      return null;
    }
    return change
  });
}

export default new Game();