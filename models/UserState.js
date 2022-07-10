class UserState {
  constructor() {
    this.email = null;
    this.picture = null;
  }

  setUserState({ email, picture }) {
    this.email = email;
    this.picture = picture;
  }

  getProperties() {
    return {
      email: this.email,
      picture: this.picture,
    };
  }
}

export default UserState;
