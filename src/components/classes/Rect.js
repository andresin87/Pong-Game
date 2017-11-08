/**
 * Company: Redpoints.
 * Website: www.redpoints.com
 * Date: 08/11/2017
 * Project: Pong-Game
 * Description: The description here
 */

import Vector from './Vector';

export default class Rect {
  constructor(w, h) {
    this.pos = new Vector;
    this.size = new Vector(w, h);
  }
  get left() {
    return this.pos.x - this.size.x / 2;
  }
  get right() {
    return this.pos.x + this.size.x / 2;
  }
  get top() {
    return this.pos.y - this.size.y / 2;
  }
  get bottom() {
    return this.pos.y + this.size.y / 2;
  }
  get bounds() {
    return {
      top: this.top(),
      bottom: this.bottom(),
      right: this.right(),
      left: this.left(),
    };
  }
}
