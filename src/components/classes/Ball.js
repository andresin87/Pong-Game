/**
 * Company: Redpoints.
 * Website: www.redpoints.com
 * Date: 08/11/2017
 * Project: Pong-Game
 * Description: The description here
 */

import Vector from './Vector';
import Rect from './Rect';

export default class Ball extends Rect {
  constructor() {
    super(10, 10);
    this.vel = new Vector;
  }
}
