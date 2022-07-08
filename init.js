import Controller from './controllers/index.js';
import { postLogin } from './utils/api.js';

async function init() {
  const controller = new Controller();

  if (controller.router.currentRoute === '/') {
    controller.handleEventsOverTime();
  }

  if (controller.router.currentRoute === '/login') {
    document.querySelector('button').addEventListener('click', postLogin);
  }
}

document.addEventListener('DOMContentLoaded', init);
