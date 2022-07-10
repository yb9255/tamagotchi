import MainPage from './MainPage.js';
import LoginPage from './LoginPage.js';
import ProfilePage from './ProfilePage.js';

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
        view: ProfilePage,
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
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const potentialMatches = this.#routes.map((route) => {
      return {
        route: route,
        result: location.pathname === route.path ? true : null,
      };
    });

    let match = potentialMatches.find((potentialMatch) => {
      return potentialMatch.result !== null;
    });

    this.currentRoute = match.route.path;

    const view = new match.route.view();
    const root = document.querySelector('#root');

    if (!isLoggedIn && (location.pathname !== '/login' || !match)) {
      this.navigateTo('/login');
      return;
    } else if (isLoggedIn && (location.pathname === '/login' || !match)) {
      this.navigateTo('/');
      return;
    }

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

    window.addEventListener('popstate', () => {
      this.router.bind(this);
    });

    this.router();
  }
}

export default Router;
