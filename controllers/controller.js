import eggView from '../views/EggView.js';
import childView from '../views/ChildView.js';
import modalView from '../views/ModalView.js';
import stateView from '../views/StateView.js';

import { INIT, GROWTH, TICK_SECONDS, IDLING } from '../constants/gameState.js';

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
  const leftCallback = () => {
    childView.drawMenu();
    gameState.setMenuState();
  };

  const middleCallback = childView.selectMenu.bind(childView, {
    async feedCallback() {
      buttonState.removeListeners();

      if (gameState.hunger < 2) {
        await childView.drawDenyingChild();

        buttonState.addListeners({
          leftCallback,
          middleCallback,
          rightCallback,
        });

        gameState.setIdlingState();
        childView.drawIdlingChild();

        return;
      }
      await childView.drawEatingChild();

      gameState.reduceHunger();
      gameState.setIdlingState();
      childView.drawIdlingChild();

      buttonState.addListeners({
        leftCallback,
        middleCallback,
        rightCallback,
      });
    },
    async playCallback() {
      buttonState.removeListeners();

      if (gameState.fun > 8) {
        await childView.drawDenyingChild();

        buttonState.addListeners({
          leftCallback,
          middleCallback,
          rightCallback,
        });

        gameState.setIdlingState();
        childView.drawIdlingChild();

        return;
      }

      await childView.drawPlayingChild();
      gameState.makePetFun();
      gameState.setIdlingState();
      childView.drawIdlingChild();

      buttonState.addListeners({
        leftCallback,
        middleCallback,
        rightCallback,
      });
    },
    stateCallback() {
      childView.removeMenu();
      stateView.drawStateView(
        gameState.fun,
        gameState.hunger,
        gameState.tiredness,
      );
    },
    sleepCallback() {},
  });

  const rightCallback = async () => {
    if (gameState.state === IDLING) return;

    childView.removeMenu();
    gameState.setIdlingState();
    childView.drawIdlingChild();
  };

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
