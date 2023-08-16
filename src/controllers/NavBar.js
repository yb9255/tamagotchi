class NavBarController {
  addLogoutListener(navbarView, logout) {
    navbarView.addLogoutListener(() => {
      localStorage.removeItem('isLoggedIn');
      logout();
    });
  }
}

export default NavBarController;
