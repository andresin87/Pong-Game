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

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    // Initialise the ball
    this.ball = new Ball;
    ball.vel.x = 100;
    ball.vel.y = 100;

    let lastTime;
    const callback = (millis) => {
      if (lastTime) {
        this.update((millis - lastTime) / 1000);
      }
      lastTime = millis;
      requestAnimationFrame(callback);
    };
    callback();
  }
  draw() {
    // Update Background
    this.context.fillStyle = '#000000';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawRect(this.ball);
  }
  drawRect(rect) {
    // Update the ball
    this.context.fillStyle = '#ffffff';
    this.context.fillRect(rect.pos.x, rect.pos.y, rect.size.x, rect.size.y);
  }
  update(dt) => {
    this.ball.pos.x += this.ball.vel.x * dt;
    this.ball.pos.y += this.ball.vel.y * dt;

    if (this.ball.left < 0 || this.ball.right > this.canvas.width) {
      this.ball.vel.x = -this.ball.vel.x;
    }
    if (this.ball.top < 0 || this.ball.bottom > this.canvas.height) {
      this.ball.vel.y = -this.ball.vel.y;
    }

    this.draw();
  }
}

class Pong extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  componentDidMount() {
    const Game = new Game(this.canvas);
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
