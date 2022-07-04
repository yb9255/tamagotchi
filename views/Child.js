import Animatable from './Animatable.js';
import menu from './Menu.js';

import {
  CHILD_IDLING_IMAGE_PATH,
  CHILD_EATING_IMAGE_PATH,
  CHILD_PLAY_IMAGE_PATH,
  CHILD_DENY_IMAGE_PATH,
} from '../constants/imagePath.js';

import {
  DX_OFFSET,
  BOUNCE_TIME,
  FEED_TIME,
  MOVE_TIME,
  PLAY_TIME,
  DENY_TIME,
} from '../constants/child.js';

class Child extends Animatable {
  constructor() {
    super();
    this.dX = 55;
    this.dY = 55;
    this.frameWidth = 300;
    this.menu = menu;

    this.drawIdlingChild = this.drawIdlingChild.bind(this);
    this.drawEatingChild = this.drawEatingChild.bind(this);
    this.drawMenu = this.drawMenu.bind(this);
    this.selectMenu = this.selectMenu.bind(this);
    this.removeMenu = this.removeMenu.bind(this);
  }

  async drawIdlingChild() {
    await this.loadImage(CHILD_IDLING_IMAGE_PATH);
    await this._idle();
  }

  async drawEatingChild() {
    await this.loadImage(CHILD_EATING_IMAGE_PATH);
    await this._feed();
  }

  async drawPlayingChild() {
    await this.loadImage(CHILD_PLAY_IMAGE_PATH);
    await this._play();
  }
  async drawDenyingChild() {
    await this.loadImage(CHILD_DENY_IMAGE_PATH);
    await this._deny();
  }

  drawMenu(setMenuState) {
    this.clear();
    this.cancelAnimation(true);
    this.menu.handleMenu();
    setMenuState();
  }

  removeMenu(removeMenuState) {
    this.cancelAnimation(false);
    removeMenuState();
    this.menu.cancelMenu();
    this.drawIdlingChild();
  }

  async selectMenu(callbacks, removeMenuState) {
    if (!this.isCanceled) return;

    this.cancelAnimation(false);
    await this.menu.selectMenu(callbacks);
    this.removeMenu(removeMenuState);
  }

  _bounceUp() {
    const frameCount = 2;
    let currentFrame = 0;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        this.frameWidth * currentFrame,
        0,
        300,
        300,
        this.dX,
        this.dY,
        300,
        300,
      );
      currentFrame++;

      if (currentFrame > frameCount) {
        resolve();
        return true;
      }
    }, BOUNCE_TIME);
  }

  _bounceDown() {
    let currentFrame = 2;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        this.frameWidth * currentFrame,
        0,
        300,
        300,
        this.dX,
        this.dY,
        300,
        300,
      );
      currentFrame--;

      if (currentFrame < 0) {
        resolve();
        return true;
      }
    }, BOUNCE_TIME);
  }

  _moveLeft() {
    let moveCount = 2;
    this.dX -= DX_OFFSET;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        0,
        0,
        300,
        300,
        this.dX,
        this.dY,
        300,
        300,
      );
      this.dX -= DX_OFFSET;
      moveCount--;

      if (!moveCount) {
        resolve();
        return true;
      }
    }, MOVE_TIME);
  }

  _moveRight() {
    let moveCount = 0;
    this.dX += DX_OFFSET;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        0,
        0,
        300,
        300,
        this.dX,
        this.dY,
        300,
        300,
      );
      this.dX += DX_OFFSET;
      moveCount++;

      if (moveCount === 2) {
        resolve();
        return true;
      }
    }, MOVE_TIME);
  }

  async _idle() {
    this.dX = 55;
    this.dY = 55;

    await this._bounceUp();
    await this._bounceDown();
    await this._moveLeft();
    await this._bounceUp();
    await this._bounceDown();
    await this._moveRight();
    await this._bounceUp();
    await this._bounceDown();
    await this._moveRight();
    await this._bounceUp();
    await this._bounceDown();
    await this._moveLeft();

    this._idle();
  }

  _feed() {
    this.dX = 55;
    this.dY = 55;
    const frameCount = 6;
    let currentFrame = 0;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        this.frameWidth * currentFrame,
        0,
        300,
        300,
        this.dX,
        this.dY,
        300,
        300,
      );

      currentFrame++;

      if (currentFrame > frameCount) {
        resolve();
        return true;
      }
    }, FEED_TIME);
  }

  _play() {
    this.dX = 55;
    this.dY = 55;
    const frameCount = 6;
    let currentFrame = 0;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        this.frameWidth * (currentFrame % 2),
        0,
        300,
        300,
        this.dX,
        this.dY,
        300,
        300,
      );

      currentFrame++;

      if (currentFrame > frameCount) {
        resolve();
        return true;
      }
    }, PLAY_TIME);
  }

  _deny() {
    this.dX = 55;
    this.dY = 55;
    const frameCount = 4;
    let currentFrame = 0;

    return this.animate((resolve) => {
      this.context.drawImage(
        this.image,
        this.frameWidth * (currentFrame % 2),
        0,
        300,
        300,
        this.dX,
        this.dY,
        300,
        300,
      );

      currentFrame++;

      if (currentFrame > frameCount) {
        resolve();
        return true;
      }
    }, DENY_TIME);
  }
}

export default new Child();
