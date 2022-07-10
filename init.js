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
      controller.handleGettingUserInfo();
      controller.handleSettingMainPage();
      controller.handleEventsOverTime();
    }
  } else if (controller.router.currentRoute === 'profile') {
    controller.handleSettingNavBar();
  } else if (controller.router.currentRoute === '/login') {
    document
      .querySelector('button')
      .addEventListener('click', controller.handleUserLogin.bind(controller));
  }
}

document.addEventListener('DOMContentLoaded', init);
