import mainStyles from '../css/main.css';
import loginStyles from '../css/login.css';

export function observeRoot(controller) {
  const observer = new MutationObserver(async (entries) => {
    if (entries[0].removedNodes[1].classList.contains(mainStyles.container)) {
      if (controller.router.currentRoute === '/') {
        controller.handleSettingMainPage();
        controller.handleSettingNavBar();
        return;
      }

      controller.handlePatchingUserInfo();
    }

    if (controller.router.currentRoute === '/') {
      controller.handleSettingMainPage();
      controller.handleSettingNavBar();

      if (
        entries[0].removedNodes[1].classList.contains(loginStyles.container)
      ) {
        controller.handleEventsOverTime();
      }
    } else if (controller.router.currentRoute === '/profile') {
      controller.handleSettingNavBar();
      controller.handleSettingProfilePage();
    } else if (controller.router.currentRoute === '/profile/:userId') {
      controller.handleSettingNavBar();
      controller.handleSettingProfileRoomPage();
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
