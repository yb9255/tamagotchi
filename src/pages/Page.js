class Page {
  constructor(params) {
    this.params = params;
  }

  setTitle(title) {
    document.title = title;
  }

  getHtml() {
    return '';
  }
}

export default Page;
