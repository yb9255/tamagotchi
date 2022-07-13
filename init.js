import Controller from './src/controller/Controller.js';
import { observeRoot } from './src/utils/observer.js';
import { postUserInfoWithClose } from './src/utils/api.js';

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
    await controller.handleGettingUserInfo();

    if (isLoggedIn) {
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
