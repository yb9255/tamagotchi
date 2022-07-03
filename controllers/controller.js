import egg from '../views/Egg.js';
import child from '../views/Child.js';
import modal from '../views/Modal.js';

import { INIT, GROWTH, TICK_SECONDS } from '../constants/gameState.js';

async function handleEventsByChange(gameState, buttonState) {
  if (gameState.growth === INIT) {
    const callback = gameState.startGame;

    buttonState.removeListeners();
    buttonState.state = gameState.growth;

    buttonState.addListeners({
      leftCallback: callback,
      middleCallback: callback,
      rightCallback: callback,
    });
  } else if (gameState.growth === GROWTH[0]) {
    const shakeEgg = egg.drawShakedEgg;
    const callback = gameState.hatchEgg.bind(gameState, shakeEgg);

    buttonState.removeListeners();
    buttonState.state = gameState.growth;

    await egg.drawStandingEgg();

    buttonState.addListeners({
      leftCallback: callback,
      middleCallback: callback,
      rightCallback: callback,
    });
  } else if (gameState.growth === GROWTH[1]) {
    const leftCallback = child.drawMenu.bind(child, gameState.setMenuState);
    const rightCallback = child.removeMenu.bind(
      child,
      gameState.cancelMenuState,
    );

    modal.hiddenModal();
    buttonState.removeListeners();
    buttonState.state = gameState.growth;

    await egg.drawBreakingEgg();
    child.drawIdlingChild();

    buttonState.addListeners({
      leftCallback,
      middleCallback: null,
      rightCallback,
    });
  } else if (gameState.growth === GROWTH[2]) {
    buttonState.state = gameState.growth;
  }
}

export function handleStatesOverTime(gameState, buttonState) {
  let nextTimeToTick = Date.now();

  const handleEventsOnTick = () => {
    const now = Date.now();

    if (gameState.growth !== buttonState.state) {
      handleEventsByChange(gameState, buttonState);
    }

    if (nextTimeToTick <= now) {
      gameState.setStatesByTime();
      nextTimeToTick = nextTimeToTick + TICK_SECONDS;
    }

    requestAnimationFrame(handleEventsOnTick);
  };

  handleEventsOnTick();
}
