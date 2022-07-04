import gameState from './models/GameState.js';
import buttonState from './models/ButtonState.js';
import frameView from './views/FrameView.js';

import { handleStatesOverTime } from './controllers/controller.js';

function init() {
  frameView.draw();
  handleStatesOverTime(gameState, buttonState);
}

init();
