import navbarStyles from '../css/navbar.css';

class NavbarView {
  #navbar = null;

  constructor() {
    this.setNavbar = this.setNavbar.bind(this);
    this.showProfileLink = this.showProfileLink.bind(this);
  }

  setNavbar(navbar) {
    this.#navbar = navbar;
  }

  showProfileLink() {
    this.#navbar
      .querySelector("a[href='/profile']")
      .classList.remove(`${navbarStyles.hidden}`);
  }
}

export default NavbarView;
