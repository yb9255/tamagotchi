import egg from '../views/Egg.js';
import child from '../views/Child.js';
import modal from '../views/Modal.js';

import { INIT, GROWTH, TICK_SECONDS } from '../constants/gameState.js';

export function handleStatesOverTime(gameState, buttonState) {
  let nextTimeToTick = Date.now();

  const handleEventsOnTick = () => {
    const now = Date.now();

    if (gameState.growth !== buttonState.state) {
      handleChangingPetPhases(gameState, buttonState);
    }

    if (nextTimeToTick <= now) {
      gameState.setStatesByTime();
      nextTimeToTick = nextTimeToTick + TICK_SECONDS;
    }

    requestAnimationFrame(handleEventsOnTick);
  };

  handleEventsOnTick();
}

function handleChangingPetPhases(gameState, buttonState) {
  if (gameState.growth === INIT) {
    buttonState.state = gameState.growth;
    const callback = gameState.startGame;

    buttonState.addListeners({
      leftCallback: callback,
      middleCallback: callback,
      rightCallback: callback,
    });
  } else if (gameState.growth === GROWTH[0]) {
    initEggPhase(gameState, buttonState);
  } else if (gameState.growth === GROWTH[1]) {
    initChildPhase(gameState, buttonState);
  } else if (gameState.growth === GROWTH[2]) {
    buttonState.state = gameState.growth;
  }
}

async function initEggPhase(gameState, buttonState) {
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
}

async function initChildPhase(gameState, buttonState) {
  const leftCallback = child.drawMenu.bind(child, gameState.setMenuState);

  const middleCallback = child.selectMenu.bind(
    child,
    {
      feedCallback: async () => {
        if (gameState.hungry < 2) {
          await child.drawDenyingChild();
          return;
        }

        await child.drawEatingChild();
        gameState.reduceHunger();
      },
      playCallback: async () => {
        if (gameState.fun > 8) {
          await child.drawDenyingChild();
          return;
        }

        await child.drawPlayingChild();
        gameState.makePetFun();
      },
    },
    gameState.cancelMenuState,
  );

  const rightCallback = child.removeMenu.bind(child, gameState.cancelMenuState);

  modal.hiddenModal();
  buttonState.removeListeners();
  buttonState.state = gameState.growth;

  await egg.drawBreakingEgg();
  child.drawIdlingChild();

  buttonState.addListeners({
    leftCallback,
    middleCallback,
    rightCallback,
  });
}
