import navbarStyles from '../css/navbar.css';

class NavbarView {
  #navbar = null;
  #logoutCallback = null;

  constructor() {
    this.setNavbar = this.setNavbar.bind(this);
    this.showProfileLink = this.showProfileLink.bind(this);
    this.addLogoutListener = this.addLogoutListener.bind(this);
  }

  setNavbar(navbar) {
    this.#navbar = navbar;
  }

  addLogoutListener(callback) {
    const logoutLink = document.querySelector(`.${navbarStyles.logout}`);

    if (this.#logoutCallback) {
      logoutLink.removeEventListener('click', this.#logoutCallback);
    }

    this.#logoutCallback = callback;

    logoutLink.addEventListener('click', this.#logoutCallback);
  }

  showProfileLink() {
    this.#navbar
      .querySelector("a[href='/profile']")
      .classList.remove(`${navbarStyles.hidden}`);
  }
}

export default NavbarView;
