/**
 * Company: Redpoints.
 * Website: www.redpoints.com
 * Date: 08/11/2017
 * Project: Pong-Game
 * Description: The description here
 */

import React from 'react';
import PropTypes from 'prop-types';

class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Rect {
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
}

class Ball extends Rect {
  constructor() {
    super(10, 10);
    this.vel = new Vector;
  }
}

class Pong extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  componentDidMount() {
    const canvas = this.canvas;
    this.context = canvas.getContext('2d');

    const ball = new Ball;
    ball.vel.x = 100;
    ball.vel.y = 100;

    let lastTime;

    const callback = (millis) => {
      if (lastTime) {
        update((millis - lastTime) / 1000);
      }
      lastTime = millis;
      requestAnimationFrame(callback);
    };

    const update = (dt) => {
      ball.pos.x += ball.vel.x * dt;
      ball.pos.y += ball.vel.y * dt;

      if (ball.left < 0 || ball.right > canvas.width) {
        ball.vel.x = -ball.vel.x;
      }
      if (ball.top < 0 || ball.bottom > canvas.height) {
        ball.vel.y = -ball.vel.y;
      }

      // Add Background
      this.context.fillStyle = '#000000';
      this.context.fillRect(0, 0, canvas.width, canvas.height);

      // Add the ball
      this.context.fillStyle = '#ffffff';
      this.context.fillRect(ball.pos.x, ball.pos.y, ball.size.x, ball.size.y);
    }

    callback();

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
