import mainStyles from '../css/main.css';

class MainPageController {
  handleSetMainPage({
    currentMainView,
    buttonState,
    frameView,
    eggView,
    childView,
    adultView,
    moodView,
    stateView,
    mainModalView,
    navbarView,
    helpModalView,
    onChangingPetPhases,
  }) {
    if (currentMainView) {
      currentMainView.cancelAnimation();
    }

    const {
      tamagotchiContainer,
      leftBtn,
      middleBtn,
      rightBtn,
      frame,
      tablet,
      modal,
      navbar,
      helpModal,
      backdrop,
      xBtn,
      helpModalBtn,
    } = this.#getMainPageElements();

    buttonState.setButtonElements(leftBtn, middleBtn, rightBtn);
    frameView.setContext(frame);
    eggView.setContext(tablet);
    childView.setContext(tablet);
    adultView.setContext(tablet);
    moodView.setContext(tablet);
    moodView.setContainer(tamagotchiContainer);
    stateView.setContext(tablet);
    mainModalView.setModalElement(modal);
    navbarView.setNavbar(navbar);

    helpModalView.setHelpModalElements(helpModal, backdrop, helpModalBtn, xBtn);

    helpModalView.addListeners(() => helpModalView.toggleHelpModal());

    frameView.draw();
    onChangingPetPhases();
  }

  #getMainPageElements() {
    const tamagotchiContainer = document.querySelector(
      `.${mainStyles['tamagotchi-container']}`,
    );

    const leftBtn = document.querySelector(`.${mainStyles['btn--1']}`);
    const middleBtn = document.querySelector(`.${mainStyles['btn--2']}`);
    const rightBtn = document.querySelector(`.${mainStyles['btn--3']}`);
    const frame = document.querySelector(`#${mainStyles.frame}`);
    const tablet = document.querySelector(`#${mainStyles.tablet}`);
    const modal = document.querySelector(`.${mainStyles.modal}`);
    const navbar = document.querySelector('nav');
    const helpModal = document.querySelector(`.${mainStyles['help-modal']}`);
    const backdrop = document.querySelector(`.${mainStyles.backdrop}`);
    const xBtn = document.querySelector(`.${mainStyles['x-btn']}`);

    const helpModalBtn = document.querySelector(
      `.${mainStyles['help-modal-btn']}`,
    );

    return {
      tamagotchiContainer,
      leftBtn,
      middleBtn,
      rightBtn,
      frame,
      tablet,
      modal,
      navbar,
      helpModal,
      backdrop,
      xBtn,
      helpModalBtn,
    };
  }
}

export default MainPageController;
