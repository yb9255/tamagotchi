/* eslint-disable */
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(
  path.resolve(__dirname, '../../index.html'),
  'utf8',
);

import fetch from 'node-fetch';
import '@testing-library/jest-dom';

import {
  getByRole,
  getAllByRole,
  getByText,
  getByTestId,
} from '@testing-library/dom';

import { JSDOM } from 'jsdom';
import { profileMarkup } from '../constants/markups.js';
import { server } from '../mocks/server.js';

const API_URL =
  process.env.ENV === 'development'
    ? process.env.API_URL_DEV
    : process.env.API_URL_PROD;

describe('Profile Page', () => {
  let dom;
  let container;
  const userInformation = {
    email: 'test@test.com',
    picture: 'https://test.com',
    state: 'IDLING',
    growth: 'ADULT',
    fun: 10,
    hunger: 10,
    birthCount: 10,
    tiredness: 10,
    exp: 10,
    happiness: 10,
    profileName: 'yoobin',
    profileDescription: 'hi',
  };

  const patchNewProfile = async (name, description) => {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newProfile: {
          profileName: name,
          profileDescription: description,
        },
      }),
    });

    return await response.json();
  };

  beforeAll(() => {
    server.listen();

    dom = new JSDOM(html);
    container = dom.window.document.body;
    container.innerHTML = profileMarkup;
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('Should have navigation bar with logo img', () => {
    const navbar = getByRole(container, 'navigation');
    const logo = navbar.querySelector('img');

    expect(navbar).toBeInTheDocument();
    expect(logo).toHaveAttribute('src');
    expect(logo.src).toEqual('./images/logo.png');
  });

  it('Should have links in navigation bar', () => {
    const navbar = getByRole(container, 'navigation');
    const navbarLinks = navbar.querySelector('.navbar-links');
    const isAnchors = Array.from(navbarLinks.children).every(
      (child) => child.tagName === 'A',
    );

    expect(navbarLinks).toBeInTheDocument();
    expect(navbarLinks.children[1]).not.toHaveClass('hidden');
    expect(isAnchors).toBeTruthy();
  });

  it('Should have a hidden modal', () => {
    const hiddenModal = getByTestId(container, 'modal');
    const modalForm = hiddenModal.querySelector('form');
    const [nameInput, descriptionTextArea] = getAllByRole(modalForm, 'textbox');
    const submitButton = getByRole(hiddenModal, 'button');

    expect(hiddenModal).toBeInTheDocument();
    expect(hiddenModal).toHaveClass('hidden');
    expect(modalForm).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(descriptionTextArea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('Should update profile information using modal', async () => {
    const hiddenModal = getByTestId(container, 'modal');
    const modalForm = hiddenModal.querySelector('form');
    const [nameInput, descriptionTextArea] = getAllByRole(modalForm, 'textbox');

    nameInput.value = 'yb';
    descriptionTextArea.value = 'hello';

    let responseData = await patchNewProfile(
      nameInput.value,
      descriptionTextArea.value,
    );

    const submitButton = getByRole(hiddenModal, 'button');
    const mockCallback = jest.fn().mockImplementation(() => {
      userInformation.profileName = responseData.profileName;
      userInformation.profileDescription = responseData.profileDescription;
    });

    modalForm.addEventListener('submit', (event) => {
      event.preventDefault();
      mockCallback();
    });

    submitButton.click();

    expect(userInformation.profileName).toEqual('yb');
    expect(userInformation.profileDescription).toEqual('hello');

    nameInput.value = 'yoobin';
    descriptionTextArea.value = 'hi';

    responseData = await patchNewProfile(
      nameInput.value,
      descriptionTextArea.value,
    );

    submitButton.click();

    expect(userInformation.profileName).toEqual('yoobin');
    expect(userInformation.profileDescription).toEqual('hi');
  });
});
