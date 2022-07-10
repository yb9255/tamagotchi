class UserState {
  constructor() {
    this.email = null;
    this.picture = null;
  }

  setUserState({ email, picture }) {
    this.email = email;
    this.picture = picture;
  }
}

export default UserState;
