import eggView from '../views/EggView.js';
import childView from '../views/ChildView.js';
import modalView from '../views/ModalView.js';

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
  const shakeEgg = eggView.drawShakedEgg;
  const callback = gameState.hatchEgg.bind(gameState, shakeEgg);

  buttonState.removeListeners();
  buttonState.state = gameState.growth;

  await eggView.drawStandingEgg();

  buttonState.addListeners({
    leftCallback: callback,
    middleCallback: callback,
    rightCallback: callback,
  });
}

async function initChildPhase(gameState, buttonState) {
  const leftCallback = childView.drawMenu.bind(
    childView,
    gameState.setMenuState,
  );

  const middleCallback = childView.selectMenu.bind(
    childView,
    {
      feedCallback: async () => {
        if (gameState.hunger < 2) {
          await childView.drawDenyingChild();
          return;
        }

        await childView.drawEatingChild();
        gameState.reduceHunger();
      },
      playCallback: async () => {
        if (gameState.fun > 8) {
          await childView.drawDenyingChild();
          return;
        }

        await childView.drawPlayingChild();
        gameState.makePetFun();
      },
    },
    gameState.cancelMenuState,
  );

  const rightCallback = childView.removeMenu.bind(
    childView,
    gameState.cancelMenuState,
  );

  modalView.hiddenModal();
  buttonState.removeListeners();
  buttonState.state = gameState.growth;

  await eggView.drawBreakingEgg();
  childView.drawIdlingChild();

  buttonState.addListeners({
    leftCallback,
    middleCallback,
    rightCallback,
  });
}
