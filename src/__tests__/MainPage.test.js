/* eslint-disable */
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(
  path.resolve(__dirname, '../../index.html'),
  'utf8',
);

import { getByRole, getAllByRole, getByText } from '@testing-library/dom';
import '@testing-library/jest-dom';

import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import { mainMarkup } from '../constants/markups.js';
import { server } from '../mocks/server.js';

const API_URL =
  process.env.ENV === 'development'
    ? process.env.API_URL_DEV
    : process.env.API_URL_PROD;

describe('Main Page', () => {
  let dom;
  let container;

  const getUserInformation = async () => {
    const response = await fetch(`${API_URL}/users/user-information`);
    return await response.json();
  };

  beforeAll(() => {
    server.listen();

    dom = new JSDOM(html);
    container = dom.window.document.body;
    container.innerHTML = mainMarkup;
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('Should have navigation bar with logo img', () => {
    const navbar = getByRole(container, 'navigation');
    const logo = navbar.querySelector('img');

    expect(navbar).toBeInTheDocument();
    expect(logo.src).toEqual('./images/logo.png');
  });

  it('Should have links in navigation bar', () => {
    const navbar = getByRole(container, 'navigation');
    const navbarLinks = navbar.querySelector('.navbar-links');
    const isAnchors = Array.from(navbarLinks.children).every(
      (child) => child.tagName === 'A',
    );

    expect(navbarLinks).toBeInTheDocument();
    expect(navbarLinks.children[1]).toHaveClass('hidden');
    expect(isAnchors).toBeTruthy();
  });

  it('Should have frame canvas', () => {
    const frameCanvas = getByText(container, 'Frame Canvas');

    expect(frameCanvas).toBeInTheDocument();
    expect(frameCanvas.width).toEqual(900);
    expect(frameCanvas.height).toEqual(900);
  });

  it('Should have tablet canvas', () => {
    const tabletCanvas = getByText(container, 'Tablet Canvas');

    expect(tabletCanvas).toBeInTheDocument();
    expect(tabletCanvas.width).toEqual(400);
    expect(tabletCanvas.height).toEqual(400);
  });

  it('Should have 3 buttons', () => {
    const buttons = getAllByRole(container, 'button');

    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[1]).toBeInTheDocument();
    expect(buttons[2]).toBeInTheDocument();
  });

  it('Should have hidden menu with items', () => {
    const menu = container.querySelector('.menu');

    expect(menu).toBeInTheDocument();
    expect(menu).toHaveClass('hidden');
    expect(menu.children).toHaveLength(4);
  });

  it('Should set user information by server', async () => {
    const responseData = await getUserInformation();

    expect(responseData.ok).toBeTruthy();
    expect(responseData.status).toEqual(200);
    expect(responseData.userInformation).toMatchObject({
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
});
