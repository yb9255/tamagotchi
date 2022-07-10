import mainStyles from '../css/main.css';

export function observeRoot(controller) {
  const observer = new MutationObserver((entries) => {
    if (entries[0].removedNodes[1].classList.contains(mainStyles.container)) {
      if (controller.router.currentRoute === '/') {
        controller.handleSettingMainPage();
        return;
      }

      controller.handlePatchingUserInfo();
    }

    if (controller.router.currentRoute === '/') {
      controller.handleSettingMainPage();
    } else if (controller.router.currentRoute === '/profile') {
      controller.handleSettingNavBar();
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
