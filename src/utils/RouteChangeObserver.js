import debounce from 'lodash.debounce';
import loginStyles from '../css/login.css';

import { GROWTH } from '../constants/gameState';

class RouteChangeObserver {
  #controller = null;

  constructor(controller) {
    this.#controller = controller;
  }

  observeRoot() {
    const observer = new MutationObserver(async (entries) => {
      const fromLoginPage =
        entries[0].removedNodes[1].classList.value === loginStyles.container;

      if (
        (location.pathname === '/' || location.pathname === '/profile') &&
        !fromLoginPage
      ) {
        this.#patchInfoByRouteChange();
      }

      if (this.#controller.router.currentRoute === '/') {
        this.#setMainRoute();
      } else if (this.#controller.router.currentRoute === '/profile') {
        this.#setProfileRoute();
      } else if (this.#controller.router.currentRoute === '/login') {
        this.#setLoginRoute();
      }
    });

    observer.observe(document.querySelector('#root'), {
      childList: true,
    });
  }

  #patchInfoByRouteChange() {
    const debouncedPatching = debounce(
      this.#controller.handlePatchingUserInfo.bind(this.#controller),
      3000,
    );

    debouncedPatching();
  }

  #setMainRoute() {
    if (this.#controller.currentAnimationFrame) {
      cancelAnimationFrame(this.#controller.currentAnimationFrame);
    }

    this.#controller.handleSettingMainPage();
    this.#controller.handleSettingNavBar();
    this.#controller.handleMoodImage();
    this.#controller.gameState.setIdlingState();
    this.#controller.handleEventsOverTime();
  }

  #setProfileRoute() {
    this.#controller.handleSettingNavBar();
    this.#controller.handleSettingProfilePage();

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

// export function observeRoot(controller) {
//   const observer = new MutationObserver(async (entries) => {
//     const fromLoginPage =
//       entries[0].removedNodes[1].classList.value === loginStyles.container;

//     if (
//       (location.pathname === '/' || location.pathname === '/profile') &&
//       !fromLoginPage
//     ) {
//       const debouncedPatching = debounce(
//         controller.handlePatchingUserInfo.bind(controller),
//         3000,
//       );

//       debouncedPatching();
//     }

//     if (controller.router.currentRoute === '/') {
//       if (controller.currentAnimationFrame) {
//         cancelAnimationFrame(controller.currentAnimationFrame);
//       }

//       controller.handleSettingMainPage();
//       controller.handleSettingNavBar();
//       controller.handleMoodImage();
//       controller.gameState.setIdlingState();
//       controller.handleEventsOverTime();
//     } else if (controller.router.currentRoute === '/profile') {
//       controller.handleSettingNavBar();
//       controller.handleSettingProfilePage();

//       if (
//         controller.gameState.growth !== GROWTH[1] &&
//         controller.gameState.growth !== GROWTH[2]
//       ) {
//         controller.router.navigateTo('/');
//         controller.handleEventsOverTime();
//       }
//     } else if (controller.router.currentRoute === '/login') {
//       document
//         .querySelector('button')
//         .addEventListener('click', controller.handleUserLogin.bind(controller));
//     }
//   });

//   observer.observe(document.querySelector('#root'), {
//     childList: true,
//   });
// }

// export function audioObserver(growth) {
//   if (growth === 'INIT') {
//     //
//   } else if (growth === GROWTH[0]) {
//     //
//   } else {
//     //
//   }
// }
