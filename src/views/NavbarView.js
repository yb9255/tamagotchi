import navbarStyles from '../css/navbar.css';

class NavbarView {
  #navbar = null;

  setNavbar(navbar) {
    this.#navbar = navbar;
  }

  showProfileLink() {
    this.#navbar
      .querySelector("a[href='/profile']")
      .classList.remove(`${navbarStyles.hidden}`);
  }

  hideProfileLink() {
    this.#navbar
      .querySelector("a[href='/profile']")
      .classList.add(`${navbarStyles.hidden}`);
  }
}

export default NavbarView;
