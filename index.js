import gameState from './models/GameState.js';
import buttonState from './models/ButtonState.js';
import Frame from './views/Frame.js';

import { drawFrame, handleStateOverTime } from './controllers/controller.js';

function init() {
  drawFrame(Frame);
  handleStateOverTime(gameState, buttonState);
}

init();
