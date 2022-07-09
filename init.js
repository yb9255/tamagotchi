import Controller from './controllers/index.js';
import { observeRoot } from './utils/observer.js';

async function init() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const controller = new Controller();
  observeRoot(controller);

  if (controller.router.currentRoute === '/') {
    if (isLoggedIn) {
      controller.handleMainPage();
      // await controller.handleUserLogin();
    }
  } else if (controller.router.currentRoute === '/login') {
    document
      .querySelector('button')
      .addEventListener('click', controller.handleUserLogin.bind(controller));
  }
}

document.addEventListener('DOMContentLoaded', init);
