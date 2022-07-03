import gameState from './models/GameState.js';
import buttonState from './models/ButtonState.js';
import frame from './views/Frame.js';

import { handleStatesOverTime } from './controllers/controller.js';

function init() {
  frame.draw();
  handleStatesOverTime(gameState, buttonState);
}

init();
