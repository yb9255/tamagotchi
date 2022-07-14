import Controller from './src/controller/Controller.js';
import { postUserInfoWithClose } from './src/utils/api.js';
import { GROWTH } from './src/constants/gameState.js';

async function init() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const controller = new Controller();

  window.addEventListener('beforeunload', (event) => {
    event.preventDefault();

    if (location.pathname !== '/login') {
      const userInformation = {
        ...controller.userState.getProperties(),
        ...controller.gameState.getProperties(),
      };

      postUserInfoWithClose(userInformation);
    }
  });

  if (controller.router.currentRoute === '/') {
    await controller.handleGettingUserInfo();

    if (controller.currentAnimationFrame) {
      cancelAnimationFrame(controller.currentAnimationFrame);
    }

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
