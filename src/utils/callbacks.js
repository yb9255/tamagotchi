import {
  MAX_HUNGER_FOR_DENYING,
  MIN_FUN_FOR_DENYING,
  MAX_TIREDNESS_FOR_DENYING,
} from '../constants/gameState';

export async function feedChildCallback(controller) {
  if (controller.gameState.hunger < MAX_HUNGER_FOR_DENYING) {
    controller.audioController.playDenySound();
    await controller.childView.drawDenyingChild();

    controller.gameState.setIdlingState();
    controller.childView.drawIdlingChild();
    controller.handleMoodImage();

    return;
  }

  controller.audioController.playEatSound();
  await controller.childView.drawEatingChild();

  controller.gameState.reduceHunger();
  controller.gameState.setIdlingState();
  controller.childView.drawIdlingChild();
  controller.handleMoodImage();
}

export async function feedAdultCallback(controller) {
  if (controller.gameState.hunger < MAX_HUNGER_FOR_DENYING) {
    controller.audioController.playDenySound();
    await controller.adultView.drawDenyingAdult();

    controller.gameState.setIdlingState();
    controller.adultView.drawIdlingAdult();
    controller.handleMoodImage();

    return;
  }

  controller.audioController.playEatSound();
  await controller.adultView.drawEatingAdult();

  controller.gameState.reduceHunger();
  controller.gameState.setIdlingState();
  controller.adultView.drawIdlingAdult();
  controller.handleMoodImage();
}

export async function playChildCallback(controller) {
  if (controller.gameState.fun > MIN_FUN_FOR_DENYING) {
    controller.audioController.playDenySound();
    await controller.childView.drawDenyingChild();

    controller.gameState.setIdlingState();
    controller.childView.drawIdlingChild();
    controller.handleMoodImage();

    return;
  }

  controller.audioController.playHangoutSound();
  await controller.childView.drawPlayingChild();

  controller.gameState.makePetFun();
  controller.gameState.setIdlingState();
  controller.childView.drawIdlingChild();
  controller.handleMoodImage();
}

export async function playAdultCallback(controller) {
  if (controller.gameState.fun > MIN_FUN_FOR_DENYING) {
    controller.audioController.playDenySound();
    await controller.adultView.drawDenyingAdult();

    controller.gameState.setIdlingState();
    controller.adultView.drawIdlingAdult();
    controller.handleMoodImage();

    return;
  }

  controller.audioController.playHangoutSound();
  await controller.adultView.drawPlayingAdult();

  controller.gameState.makePetFun();
  controller.gameState.setIdlingState();
  controller.adultView.drawIdlingAdult();
  controller.handleMoodImage();
}

export function stateCallback(controller) {
  controller.menuView.removeMenu();
  controller.audioController.playSelectMenuSound();

  controller.stateView.drawStateView(
    controller.gameState.fun,
    controller.gameState.hunger,
    controller.gameState.tiredness,
  );
}

export async function sleepChildCallback(controller) {
  if (controller.gameState.tiredness < MAX_TIREDNESS_FOR_DENYING) {
    controller.audioController.playDenySound();
    await controller.childView.drawDenyingChild();

    controller.gameState.setIdlingState();
    controller.childView.drawIdlingChild();
    controller.handleMoodImage();

    return;
  }

  controller.audioController.playSleepSound();
  controller.gameState.resetTirednessState();
  await controller.childView.drawSleepingChild();
  controller.gameState.setIdlingState();
  controller.childView.drawIdlingChild();
  controller.handleMoodImage();
}

export async function sleepAdultCallback(controller) {
  if (controller.gameState.tiredness < MAX_TIREDNESS_FOR_DENYING) {
    controller.audioController.playDenySound();
    await controller.adultView.drawDenyingAdult();

    controller.gameState.setIdlingState();
    controller.adultView.drawIdlingAdult();
    controller.handleMoodImage();

    return;
  }

  controller.audioController.playSleepSound();
  controller.gameState.resetTirednessState();
  await controller.adultView.drawSleepingAdult();
  controller.gameState.setIdlingState();
  controller.adultView.drawIdlingAdult();
  controller.handleMoodImage();
}
