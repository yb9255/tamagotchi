export async function feedCallback(controller) {
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

export async function playCallback(controller) {
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

export function stateCallback(controller) {
  controller.menuView.removeMenu();

  controller.stateView.drawStateView(
    controller.gameState.fun,
    controller.gameState.hunger,
    controller.gameState.tiredness,
  );
}

export async function sleepCallback(controller) {
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
