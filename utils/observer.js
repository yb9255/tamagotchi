export function observeRoot(controller) {
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
