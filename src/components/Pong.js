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
  get len() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
  set len(value) {
    const fact = value / this.len;
    this.x *= fact;
    this.y *= fact;
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
  get bounds() {
    return {
      top: this.top(),
      bottom: this.bottom(),
      right: this.right(),
      left: this.left(),
    };
  }
}

class Ball extends Rect {
  constructor() {
    super(10, 10);
    this.vel = new Vector;
  }
}

class Player extends Rect {
  constructor() {
    super(20, 100);
    this.score = 0;
  }
}

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    // Initialise the ball
    this.ball = new Ball;

    this.players = [
      new Player,
      new Player,
    ];
    this.players[0].pos.x = 40;
    this.players[1].pos.x = this.canvas.width - 40;
    this.players.forEach(player => {
      player.pos.y = this.canvas.height / 2;
    });

    let lastTime;
    const callback = (millis) => {
      if (lastTime) {
        this.update((millis - lastTime) / 1000);
      }
      lastTime = millis;
      requestAnimationFrame(callback);
    };
    callback();

    this.reset();
  }
  collide(player, ball) {
    if (
      player.left < ball.right &&
      player.right > ball.left &&
      player.top < ball.bottom &&
      player.bottom > ball.top
    ) {
      const len = ball.vel.len;
      ball.vel.x = -ball.vel.x;
      ball.vel.y += 300 * (Math.random() - .5);
      ball.vel.len *= 1.05;
    }
  }
  draw() {
    // Update Background
    this.context.fillStyle = '#000000';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawRect(this.ball);
    this.players.forEach(player => this.drawRect(player));
  }
  drawRect(rect) {
    // Update the ball
    this.context.fillStyle = '#ffffff';
    this.context.fillRect(
      rect.left,
      rect.top,
      rect.size.x,
      rect.size.y,
    );
  }
  reset() {
    this.ball.pos.x = this.canvas.width / 2;
    this.ball.pos.y = this.canvas.height / 2;
    this.ball.vel.x = 0;
    this.ball.vel.y = 0;
  }
  start() {
    if (this.ball.vel.x === 0 && this.ball.vel.y === 0) {
      this.ball.vel.x = 300 * (Math.random() > .5 ? 1 : -1);
      this.ball.vel.y = 300 * (Math.random() > .5 ? 2 : 1) * (Math.random() > .5 ? -1 : 1);
      this.ball.vel.len = 200;
    }
  }
  update(dt) {
    this.ball.pos.x += this.ball.vel.x * dt;
    this.ball.pos.y += this.ball.vel.y * dt;

    if (this.ball.left < 0 || this.ball.right > this.canvas.width) {
      let playerId = this.ball.vel.x < 0 | 0;
      this.players[playerId].score += 1;
      this.reset();
      // this.ball.vel.x = -this.ball.vel.x;
    }
    if (this.ball.top < 0 || this.ball.bottom > this.canvas.height) {
      this.ball.vel.y = -this.ball.vel.y;
    }

    this.players[1].pos.y = this.ball.pos.y;
    this.players.forEach(player => this.collide(player, this.ball));

    this.draw();
  }
}

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
