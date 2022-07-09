import Controller from './controllers/index.js';

async function init() {
  const controller = new Controller();

  if (controller.router.currentRoute === '/') {
    controller.handleEventsOverTime();
  }

  if (controller.router.currentRoute === '/login') {
    document
      .querySelector('button')
      .addEventListener('click', controller.handleUserLogin.bind(controller));
  }
}

document.addEventListener('DOMContentLoaded', init);
