import Controller from './controllers/index.js';
import { postLogin } from './utils/api.js';

async function init() {
  const controller = new Controller();

  if (controller.router.currentRoute === '/') {
    controller.handleEventsOverTime();
  }

  if (controller.router.currentRoute === '/login') {
    document.querySelector('button').addEventListener('click', async () => {
      const {
        email,
        picture,
        state,
        growth,
        fun,
        hunger,
        birthCount,
        tiredness,
        happiness,
        id,
      } = (await postLogin()).userInformation;

      console.log(
        email,
        picture,
        state,
        growth,
        fun,
        hunger,
        birthCount,
        tiredness,
        happiness,
        id,
      );
    });
  }
}

document.addEventListener('DOMContentLoaded', init);
