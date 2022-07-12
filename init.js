import Controller from './controllers/index.js';
import { observeRoot } from './utils/observer.js';
import { postUserInfoWithClose } from './utils/api.js';

async function init() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const controller = new Controller();
  observeRoot(controller);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      const userInformation = JSON.stringify({
        ...controller.userState.getProperties(),
        ...controller.gameState.getProperties(),
      });

      postUserInfoWithClose(userInformation);
    }
  });

  if (controller.router.currentRoute === '/') {
    if (isLoggedIn) {
      await controller.handleGettingUserInfo();
      controller.handleSettingNavBar();
      controller.handleSettingMainPage();
      controller.handleEventsOverTime();
    }
  } else if (controller.router.currentRoute === '/profile') {
    await controller.handleGettingUserInfo();
    controller.handleSettingNavBar();
    controller.handleSettingProfilePage();
    controller.handleEventsOverTime();
  } else if (controller.router.currentRoute === '/profile/:userId') {
    await controller.handleGettingUserInfo();
    controller.router.navigateTo('/');
    return;
  } else if (controller.router.currentRoute === '/login') {
    document
      .querySelector('button')
      .addEventListener('click', controller.handleUserLogin.bind(controller));
  }
}

document.addEventListener('DOMContentLoaded', init);
