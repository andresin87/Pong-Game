/**
 * Company: Redpoints.
 * Website: www.redpoints.com
 * Date: 08/11/2017
 * Project: Pong-Game
 * Description: The description here
 */

export default class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  get len() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  set len(value) {
    const fact = value / this.len;
    this.x *= fact;
    this.y *= fact;
  }
}
