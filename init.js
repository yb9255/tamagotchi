import Controller from './controllers/index.js';

async function init() {
  const controller = new Controller();

  if (controller.router.currentRoute === '/') {
    controller.handleEventsOverTime();
  }
}

document.addEventListener('DOMContentLoaded', init);
