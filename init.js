import Controller from './controllers/index.js';
import { observeRoot } from './utils/observer.js';

async function init() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const controller = new Controller();
  observeRoot(controller);

  window.addEventListener('beforeunload', async (event) => {
    if (controller.router.currentRoute !== '/login') {
      await controller.handlePatchingUserInfo();
      event.preventDefault();
      event.returnValue = false;
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
  } else if (controller.router.currentRoute === '/login') {
    document
      .querySelector('button')
      .addEventListener('click', controller.handleUserLogin.bind(controller));
  }
}

document.addEventListener('DOMContentLoaded', init);
