import MainPage from './MainPage.js';
import LoginPage from './LoginPage.js';

class Router {
  #routes = null;

  constructor() {
    this.currentRoute = null;
    this.#routes = [
      {
        path: '/',
        view: MainPage,
      },
      {
        path: '/login',
        view: LoginPage,
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
  }

  navigateTo(href) {
    history.pushState(null, null, href);
    this.router();
  }

  router() {
    const potentialMatches = this.#routes.map((route) => {
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
        route: this.#routes[0],
        result: ['/'],
      };
    }

    this.currentRoute = match.route.path;

    const view = new match.route.view();
    const root = document.querySelector('#root');

    root.innerHTML = '';
    root.insertAdjacentHTML('afterbegin', view.getHtml());
  }

  init() {
    document.body.addEventListener('click', (event) => {
      if (event.target.matches('[data-link]')) {
        event.preventDefault();
        this.navigateTo(event.target.href);
      }
    });

    window.addEventListener('popstate', this.router.bind(this));

    this.router();
  }
}

export default Router;
