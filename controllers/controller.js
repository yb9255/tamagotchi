import egg from '../views/Egg.js';

import { INIT, GROWTH, TICK_SECONDS } from '../constants/gameState.js';
import { STANDING, SHAKED, BIRTH } from '../constants/egg.js';

async function handleEventsByChange(gameState, buttonState) {
  if (gameState.growth === INIT) {
    const callback = gameState.startGame;

    buttonState.state = gameState.growth;
    buttonState.removeAllListeners();

    buttonState.addAllListeners({
      leftCallback: callback,
      middleCallback: callback,
      rightCallback: callback,
    });
  } else if (gameState.growth === GROWTH[0]) {
    egg.drawEgg(STANDING);

    const shakeEgg = egg.drawEgg.bind(egg, SHAKED);
    const breakEgg = egg.drawEgg.bind(egg, BIRTH);

    const callback = gameState.hatchEgg.bind(gameState, shakeEgg, breakEgg);

    buttonState.state = gameState.growth;
    buttonState.removeAllListeners();

    buttonState.addAllListeners({
      leftCallback: callback,
      middleCallback: callback,
      rightCallback: callback,
    });
  } else if (gameState.growth === GROWTH[1]) {
    buttonState.state = gameState.growth;
    buttonState.removeAllListeners();
  } else if (gameState.growth === GROWTH[2]) {
    buttonState.state = gameState.growth;
  }
}

export function drawFrame(fraimeView) {
  fraimeView.draw();
}

export function handleStateOverTime(gameState, buttonState) {
  const now = Date.now();

  if (gameState.growth !== buttonState.state) {
    handleEventsByChange(gameState, buttonState);
  }

  if (gameState.nextTimeToTick <= now) {
    gameState.tick();
    gameState.nextTimeToTick += TICK_SECONDS;
  }

  requestAnimationFrame(handleStateOverTime.bind(null, gameState, buttonState));
}
