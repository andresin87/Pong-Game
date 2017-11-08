/**
 * Company: Redpoints.
 * Website: www.redpoints.com
 * Date: 08/11/2017
 * Project: Pong-Game
 * Description: The description here
 */

import Rect from './Rect';

export default class Player extends Rect {
  constructor() {
    super(20, 100);
    this.score = 0;
  }
}
