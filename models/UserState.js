class UserState {
  constructor() {
    this.id = null;
    this.email = null;
    this.picture = null;
  }

  setUserState({ id, email, picture }) {
    this.id = id;
    this.emain = email;
    this.picture = picture;
  }
}

export default UserState;
