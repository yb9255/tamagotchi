export function navigateTo(href) {
  history.pushState(null, null, href);
  router();
}

export function router() {
  const routes = [
    {
      path: '/',
      view: () => console.log('main'),
    },
    {
      path: '/login',
      view: () => console.log('login'),
    },
    {
      path: '/profile',
      view: () => console.log('profile'),
    },
    {
      path: '/profile/:userId',
      view: () => console.log('profile userId'),
    },
    {
      path: '/game',
      view: () => console.log('game'),
    },
    {
      path: '/game/:userId',
      view: () => console.log('game userId'),
    },
  ];

  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname === route.path ? true : null,
    };
  });

  let match = potentialMatches.find((potentialMatch) => {
    return potentialMatch.result !== null;
  });

  if (!match) {
    navigateTo('/');
  }

  const view = match.route.view();
}

export default function setCSR() {
  document.body.addEventListener('click', (event) => {
    if (event.target.matches('[data-link]')) {
      event.preventDefault();
      navigateTo(event.target.href);
    }
  });

  window.addEventListener('popstate', router);

  router();
}
