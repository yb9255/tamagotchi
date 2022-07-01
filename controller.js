import gameState from './models/GameState.js';
import Frame from './views/Frame.js';

function draw() {
  const frame = document.querySelector('#frame');
  const tablet = document.querySelector('#tablet');

  if (frame.getContext && tablet.getContext) {
    Frame.drawTamagotchiEgg();
    Frame.drawTamagotchiBackground();
  }
}

function init() {
  draw();
  gameState.handleEventOverTime();
}

init();
