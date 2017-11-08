/**
 * Company: Redpoints.
 * Website: www.redpoints.com
 * Date: 08/11/2017
 * Project: Pong-Game
 * Description: The description here
 */

import React from 'react';
import PropTypes from 'prop-types';

import Game from './classes/Game';

class Pong extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  componentDidMount() {
    this.Game = new Game(this.canvas);

    this.canvas.addEventListener('mousemove', (/* ev */) => {
      this.Game.players[0].pos.y = event.offsetY;
    });
    this.canvas.addEventListener('click', (/* ev */) => {
      this.Game.start();
    });
  }
  render() {
    const { width, height } = this.props
    return (
      <canvas
        id="pong"
        ref={(c) => { this.canvas = c; }}
        width={width}
        height={height}
      />
    );
  }
}

Pong.PropTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

Pong.defaultProps = {
  width: 600,
  height: 600,
};

export default Pong;
