import { observable, computed, reaction, action, intercept } from 'mobx';
import Snack from './snack';
import Food from './food';

class Game {
  constructor() {
    this.snack = new Snack(this);
    this.food = new Food(this);
  }

  @observable status = 'stop'

  @observable speed = 300

  @observable direction = 'right'

  @action setDirection(direction) {
    this.direction = direction;
  }

  dispose = intercept(this, 'direction', (change) => {
    if (
      (change.newValue === 'left' && this.direction === 'right') ||
      (change.newValue === 'top' && this.direction === 'bottom') ||
      (change.newValue === 'right' && this.direction === 'left') ||
      (change.newValue === 'bottom' && this.direction === 'top')
    ) {
      return null;
    }
    return change;
  })

}

export default new Game();