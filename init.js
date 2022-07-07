import GameState from './models/GameState.js';
import ButtonState from './models/ButtonState.js';

import Controller from './controllers/index.js';
import EggView from './views/EggView.js';
import ChildView from './views/ChildView.js';
import StateView from './views/StateView.js';
import ModalView from './views/ModalView.js';
import FrameView from './views/FrameView.js';
import setCSR from './routes/router.js';

import './index.css';

async function init() {
  setCSR();

  const store = {
    gameState: new GameState(),
    buttonState: new ButtonState(),
  };

  const views = {
    frameView: new FrameView(),
    eggView: new EggView(),
    childView: new ChildView(),
    stateView: new StateView(),
    modalView: new ModalView(),
  };

  const controller = new Controller(store, views);
  controller.handleEventsOverTime();
}

document.addEventListener('DOMContentLoaded', init);
