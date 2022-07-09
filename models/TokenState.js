class TokenState {
  #accessToken = null;

  setAccessToken(token) {
    this.#accessToken = token;
  }

  async sendApiWithToken(api) {
    const data = await api(this.#accessToken);
    return data;
  }
}

module.exports = TokenState;
