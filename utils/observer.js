// import { postLogin } from '../utils/api.js';

export function observeRoot(controller) {
  const observer = new MutationObserver(() => {
    if (controller.router.currentRoute === '/') {
      controller.handleMainPage();
    } else if (controller.router.currentRoute === '/login') {
      //
    }
  });

  observer.observe(document.querySelector('#root'), {
    childList: true,
  });
}
