/**
 * Company: Redpoints.
 * Website: www.redpoints.com
 * Date: 08/11/2017
 * Project: Pong-Game
 * Description: The description here
 */

import Ball from './Ball';
import Player from './Player';

import CHARS from '../chars';

export default class Game {
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

    this.CHAR_PIXEL = 10;
    this.CHARS = CHARS.map(str => {
      const canvas = document.createElement('canvas');
      canvas.height = this.CHAR_PIXEL * 5;
      canvas.width = this.CHAR_PIXEL * 3;
      const context = canvas.getContext('2d');
      context.fillStyle = '#ffffff';
      str.split('').forEach((fill, i) => {
        if (fill === '1') {
          context.fillRect(
            (i % 3) *  this.CHAR_PIXEL,
            (i / 3 | 0) * this.CHAR_PIXEL,
            this.CHAR_PIXEL,
            this.CHAR_PIXEL,
          );
        }
      });
      return canvas;
    });

    this.reset();
  }
  collide(player, ball) {
    if (
      player.left < ball.right &&
      player.right > ball.left &&
      player.top < ball.bottom &&
      player.bottom > ball.top
    ) {
      // const len = ball.vel.len;
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

    this.drawScore();
  }
  drawScore() {
    const align = this.canvas.width / 3;
    const CHAR_W = this.CHAR_PIXEL * 4;
    this.players.forEach((player, index) => {
      const chars = player.score.toString().split('');
      const offset = (
          align * (index + 1)
        )
        -
        (CHAR_W * chars.length / 2)
        +
        this.CHAR_PIXEL
      ;
      chars.forEach((char, pos) => {
        this.context.drawImage(
          this.CHARS[char | 0],
          offset + pos * CHAR_W,
          20,
        );
      });
    });
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
