import { auth } from '../firebase/firebase-config.js';

export function observeRoot(controller) {
  auth.onIdTokenChanged((user) => {
    controller.tokenState.setAccessToken(user.accessToken);
  });

  const observer = new MutationObserver(() => {
    if (controller.router.currentRoute === '/') {
      controller.handleMainPage();
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
