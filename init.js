import gameState from './models/GameState.js';
import buttonState from './models/ButtonState.js';

import Controller from './controllers/index.js';
import EggView from './views/EggView.js';
import ChildView from './views/ChildView.js';
import StateView from './views/StateView.js';
import ModalView from './views/ModalView.js';
import FrameView from './views/FrameView.js';
import setCSR from './routes/route.js';

import './index.css';

function init() {
  const store = {
    gameState,
    buttonState,
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

document.addEventListener('DOMContentLoaded', () => {
  setCSR();
});
