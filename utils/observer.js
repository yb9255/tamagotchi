export function observeRoot(controller) {
  const observer = new MutationObserver(() => {
    if (controller.router.currentRoute === '/') {
      controller.handleMainPage();
    } else if (controller.router.currentRoute === '/login') {
      console.log('login');
    }
  });

  observer.observe(document.querySelector('#root'), {
    childList: true,
  });
}
