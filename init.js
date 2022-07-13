import Controller from './src/controller/Controller.js';
import { observeRoot } from './src/utils/observer.js';
import { postUserInfoWithClose } from './src/utils/api.js';
import { GROWTH } from './src/constants/gameState.js';

async function init() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const controller = new Controller();
  observeRoot(controller);

  window.addEventListener('beforeunload', (event) => {
    event.preventDefault();

    const userInformation = {
      ...controller.userState.getProperties(),
      ...controller.gameState.getProperties(),
    };

    postUserInfoWithClose(userInformation);
  });

  if (controller.router.currentRoute === '/') {
    if (controller.currentAnimationFrame) {
      cancelAnimationFrame(controller.currentAnimationFrame);
    }

    await controller.handleGettingUserInfo();

    if (isLoggedIn) {
      controller.handleSettingNavBar();
      controller.handleSettingMainPage();
      controller.gameState.setIdlingState();
      controller.handleEventsOverTime();
    }
  } else if (controller.router.currentRoute === '/profile') {
    if (
      controller.gameState.growth !== GROWTH[1] &&
      controller.gameState.growth !== GROWTH[2]
    ) {
      controller.router.navigateTo('/');
      return;
    }

    await controller.handleGettingUserInfo();

    if (isLoggedIn) {
      controller.handleSettingNavBar();
      controller.handleSettingProfilePage();
      controller.handleEventsOverTime();
    }
  } else if (controller.router.currentRoute === '/login') {
    document
      .querySelector('button')
      .addEventListener('click', controller.handleUserLogin.bind(controller));
  }
}

document.addEventListener('DOMContentLoaded', init);
