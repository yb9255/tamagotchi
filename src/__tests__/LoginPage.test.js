/* eslint-disable */
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(
  path.resolve(__dirname, '../../index.html'),
  'utf8',
);

import fetch from 'node-fetch';
import { getByRole, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { JSDOM } from 'jsdom';
import { loginMarkup } from '../constants/markups.js';
import { server } from '../mocks/server.js';

const API_URL =
  process.env.ENV === 'development'
    ? process.env.API_URL_DEV
    : process.env.API_URL_PROD;

describe('Login Page', () => {
  let dom;
  let container;
  let callbackResult;

  const loginSuccessCallback = async () => {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: 'BEARER token',
      }),
    });

    return await response.json();
  };

  const loginFailureCallback = async () => {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: 'no-token',
      }),
    });

    return await response.json();
  };

  beforeAll(() => {
    server.listen();

    dom = new JSDOM(html);
    container = dom.window.document.body;
    container.innerHTML = loginMarkup;
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('Should have logo image', () => {
    const imageElement = getByRole(container, 'img');

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src');
    expect(imageElement.src).toEqual('./images/logo.png');
  });

  it('Should have login button', () => {
    const loginButtonElement = getByRole(container, 'button');

    expect(loginButtonElement).toBeInTheDocument();
    expect(loginButtonElement).toHaveTextContent('Sign in with Google');
  });

  it('Should get pet data when clicks button with access token', async () => {
    const loginResponse = await loginSuccessCallback();
    const loginButtonElement = getByRole(container, 'button');

    const mockCallback = jest
      .fn()
      .mockImplementation(() => (callbackResult = loginResponse));

    loginButtonElement.addEventListener('click', mockCallback);

    fireEvent.click(loginButtonElement);

    loginButtonElement.removeEventListener('click', mockCallback);

    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(callbackResult.ok).toEqual(true);
    expect(callbackResult.status).toEqual(200);
    expect(callbackResult.userInformation).toMatchObject({
      email: 'test@test.com',
      picture: 'https://test.com',
      state: 'IDLING',
      growth: 'ADULT',
      fun: 10,
      hunger: 10,
      birthCount: 0,
      tiredness: 10,
      exp: 10,
      happiness: 10,
      profileName: 'yoobin',
      profileDescription: 'hi',
    });
  });

  it('Should fail to get pet data when clicks button without token', async () => {
    const loginResponse = await loginFailureCallback();
    const loginButtonElement = getByRole(container, 'button');

    const mockCallback = jest
      .fn()
      .mockImplementation(() => (callbackResult = loginResponse));

    loginButtonElement.addEventListener('click', mockCallback);

    fireEvent.click(loginButtonElement);

    loginButtonElement.removeEventListener('click', mockCallback);

    expect(loginResponse.status).toEqual(400);
    expect(loginResponse.ok).toBeFalsy();
    expect(loginResponse.message).toEqual('로그인 토큰이 존재하지 않습니다.');
  });
});
