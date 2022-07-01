import { TICK_SECONDS } from '../constants/gameState.js';

function handleButtonsListener(gameState, buttonState) {
  if (gameState.growth === 'INIT') {
    buttonState.state = gameState.growth;
    buttonState.removeAllListeners();

    buttonState.leftCallback =
      buttonState.middleCallback =
      buttonState.rightCallback =
        gameState.startGame;

    buttonState.addAllListeners();
  } else if (gameState.growth === 'EGG') {
    buttonState.state = gameState.growth;
    buttonState.removeAllListeners();

    buttonState.leftCallback =
      buttonState.middleCallback =
      buttonState.rightCallback =
        gameState.hatchEgg;

    buttonState.addAllListeners();
  } else if (gameState.growth === 'LV1') {
    buttonState.state = gameState.growth;
  } else if (gameState.growth === 'LV2') {
    buttonState.state = gameState.growth;
  }
}

export function drawFrame(fraimeView) {
  const frame = document.querySelector('#frame');
  const tablet = document.querySelector('#tablet');

  if (frame.getContext && tablet.getContext) {
    fraimeView.drawTamagotchiEgg();
    fraimeView.drawTamagotchiBackground();
  }
}

export function handleStateOverTime(gameState, buttonState) {
  const now = Date.now();

  if (gameState.growth !== buttonState.state) {
    handleButtonsListener(gameState, buttonState);
  }

  if (gameState.nextTimeToTick <= now) {
    gameState.tick();
    gameState.nextTimeToTick += TICK_SECONDS;
    console.log('TICK', gameState.clock);
  }

  requestAnimationFrame(handleStateOverTime.bind(null, gameState, buttonState));
}
