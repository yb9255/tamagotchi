export async function feedChildCallback(controller) {
  if (controller.gameState.hunger < 2) {
    await controller.childView.drawDenyingChild();

    controller.gameState.setIdlingState();
    controller.childView.drawIdlingChild();

    return;
  }

  await controller.childView.drawEatingChild();

  controller.gameState.reduceHunger();
  controller.gameState.setIdlingState();
  controller.childView.drawIdlingChild();
}

export async function feedAdultCallback(controller) {
  if (controller.gameState.hunger < 2) {
    await controller.adultView.drawDenyingAdult();

    controller.gameState.setIdlingState();
    controller.adultView.drawIdlingAdult();

    return;
  }

  await controller.adultView.drawEatingAdult();

  controller.gameState.reduceHunger();
  controller.gameState.setIdlingState();
  controller.adultView.drawIdlingAdult();
}

export async function playChildCallback(controller) {
  if (controller.gameState.fun > 8) {
    await controller.childView.drawDenyingChild();

    controller.gameState.setIdlingState();
    controller.childView.drawIdlingChild();

    return;
  }

  await controller.childView.drawPlayingChild();

  controller.gameState.makePetFun();
  controller.gameState.setIdlingState();
  controller.childView.drawIdlingChild();
}

export async function playAdultCallback(controller) {
  if (controller.gameState.fun > 8) {
    await controller.adultView.drawDenyingAdult();

    controller.gameState.setIdlingState();
    controller.adultView.drawIdlingAdult();

    return;
  }

  await controller.adultView.drawPlayingAdult();

  controller.gameState.makePetFun();
  controller.gameState.setIdlingState();
  controller.adultView.drawIdlingAdult();
}

export function stateCallback(controller) {
  controller.menuView.removeMenu();

  controller.stateView.drawStateView(
    controller.gameState.fun,
    controller.gameState.hunger,
    controller.gameState.tiredness,
  );
}

export async function sleepChildCallback(controller) {
  if (controller.gameState.tiredness < 3) {
    await controller.childView.drawDenyingChild();

    controller.gameState.setIdlingState();
    controller.childView.drawIdlingChild();

    return;
  }

  controller.gameState.resetTirednessState();
  await controller.childView.drawSleepingChild();
  controller.childView.drawIdlingChild();
}

export async function sleepAdultCallback(controller) {
  if (controller.gameState.tiredness < 3) {
    await controller.adultView.drawDenyingAdult();

    controller.gameState.setIdlingState();
    controller.adultView.drawIdlingAdult();

    return;
  }

  controller.gameState.resetTirednessState();
  await controller.adultView.drawSleepingAdult();
  controller.adultView.drawIdlingAdult();
}
