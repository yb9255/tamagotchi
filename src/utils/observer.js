import debounce from 'lodash.debounce';
import loginStyles from '../css/login.css';
import profileStyles from '../css/profile.css';
import { GROWTH } from '../constants/gameState';

export function observeRoot(controller) {
  const observer = new MutationObserver(async (entries) => {
    if (location.pathname === '/' || location.pathname === '/profile') {
      const debouncedPatching = debounce(
        controller.handlePatchingUserInfo.bind(controller),
        3000,
      );

      debouncedPatching();
    }

    if (controller.router.currentRoute === '/') {
      const fromLoginPage = entries[0].removedNodes[1].classList.contains(
        loginStyles.container,
      );

      const fromProfileBeforeEgg =
        entries[0].removedNodes[1].classList.contains(
          profileStyles.container,
        ) &&
        controller.gameState.growth !== GROWTH[1] &&
        controller.gameState.growth !== GROWTH[2];

      controller.handleSettingMainPage();
      controller.handleSettingNavBar();
      controller.handleMoodImage();

      if (fromLoginPage || fromProfileBeforeEgg) {
        if (controller.currentAnimationFrame) {
          cancelAnimationFrame(controller.currentAnimationFrame);
        }

        controller.gameState.setIdlingState();
        controller.handleEventsOverTime();
      }
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
