import MainPage from './MainPage.js';

function navigateTo(href) {
  history.pushState(null, null, href);
  router();
}

function router() {
  const routes = [
    {
      path: '/',
      view: MainPage,
    },
    {
      path: '/login',
      view: MainPage,
    },
    {
      path: '/profile',
      view: MainPage,
    },
    {
      path: '/profile/:userId',
      view: MainPage,
    },
    {
      path: '/game',
      view: MainPage,
    },
    {
      path: '/game/:userId',
      view: MainPage,
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
    match = {
      route: routes[0],
      result: ['/'],
    };
  }

  const view = new match.route.view();
  const root = document.querySelector('#root');

  root.innerHTML = '';
  root.insertAdjacentHTML('afterbegin', view.getHtml());
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
