import debounce from 'lodash.debounce';

import { GROWTH } from '../constants/gameState';

export function observeRoot(controller) {
  const observer = new MutationObserver(async () => {
    if (location.pathname === '/' || location.pathname === '/profile') {
      const debouncedPatching = debounce(
        controller.handlePatchingUserInfo.bind(controller),
        3000,
      );

      debouncedPatching();
    }

    if (controller.router.currentRoute === '/') {
      if (controller.currentAnimationFrame) {
        cancelAnimationFrame(controller.currentAnimationFrame);
      }

      controller.handleSettingMainPage();
      controller.handleSettingNavBar();
      controller.handleMoodImage();
      controller.gameState.setIdlingState();
      controller.handleEventsOverTime();
    } else if (controller.router.currentRoute === '/profile') {
      controller.handleSettingNavBar();
      controller.handleSettingProfilePage();

      if (
        controller.gameState.growth !== GROWTH[1] &&
        controller.gameState.growth !== GROWTH[2]
      ) {
        controller.router.navigateTo('/');
        controller.handleEventsOverTime();
      }
    } else if (controller.router.currentRoute === '/login') {
      document
        .querySelector('button')
        .addEventListener('click', controller.handleUserLogin.bind(controller));
    }
  });

  observer.observe(document.querySelector('#root'), {
    childList: true,
  });
}
