import tamagotchiFrame from './views/TamagotchiFrame.js';
import tamagotchi from './views/Tamagotchi.js';

function draw() {
  const frame = document.querySelector('#frame');
  const tablet = document.querySelector('#tablet');

  if (frame.getContext) {
    tamagotchiFrame.drawTamagotchiEgg();
    tamagotchiFrame.drawTamagotchiBackground();

    if (tablet.getContext) {
      tamagotchi.drawTamagotchi();
    }
  }
}

function init() {
  draw();
}

window.addEventListener('load', init);
