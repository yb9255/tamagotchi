import { GROWTH } from '../constants/gameState';

class RouteChangeObserver {
  #controller = null;

  constructor() {
    this.setController = this.setController.bind(this);
    this.observeRoot = this.observeRoot.bind(this);
  }

  setController(controller) {
    this.#controller = controller;
  }

  observeRoot() {
    const observer = new MutationObserver(async () => {
      if (this.#controller.router.currentRoute === '/') {
        this.#setMainRoute();
        return;
      }

      if (this.#controller.router.currentRoute === '/profile') {
        this.#setProfileRoute();
        return;
      }

      if (this.#controller.router.currentRoute === '/login') {
        this.#setLoginRoute();
        return;
      }
    });

    observer.observe(document.querySelector('#root'), {
      childList: true,
    });
  }

  #setMainRoute() {
    if (this.#controller.currentAnimationFrame) {
      cancelAnimationFrame(this.#controller.currentAnimationFrame);
    }

    this.#controller.handleSetMainPage();
    this.#controller.handleSettingNavBar();
    this.#controller.handleMoodImage();
    this.#controller.gameState.setIdlingState();
    this.#controller.handleEventsOverTime();
  }

  #setProfileRoute() {
    this.#controller.handleSettingNavBar();
    this.#controller.handleSetProfilePage();

    if (
      this.#controller.gameState.growth !== GROWTH[1] &&
      this.#controller.gameState.growth !== GROWTH[2]
    ) {
      this.#controller.router.navigateTo('/');
    }
  }

  #setLoginRoute() {
    document
      .querySelector('button')
      .addEventListener(
        'click',
        this.#controller.handleUserLogin.bind(this.#controller),
      );
  }
}

export default RouteChangeObserver;
