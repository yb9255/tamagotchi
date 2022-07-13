import debounce from 'lodash.debounce';
import loginStyles from '../css/login.css';

export function observeRoot(controller) {
  const observer = new MutationObserver(async (entries) => {
    if (controller.router.currentRoute !== '/login') {
      const debouncedPatching = debounce(
        controller.handlePatchingUserInfo.bind(controller),
        3000,
      );

      debouncedPatching();
    }

    if (controller.router.currentRoute === '/') {
      controller.handleSettingMainPage();
      controller.handleSettingNavBar();
      controller.handleMoodImage();

      if (
        entries[0].removedNodes[1].classList.contains(loginStyles.container)
      ) {
        controller.gameState.setIdlingState();
        controller.handleEventsOverTime();
      }
    } else if (controller.router.currentRoute === '/profile') {
      controller.handleSettingNavBar();
      controller.handleSettingProfilePage();
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
