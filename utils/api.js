import { auth, provider } from '../firebase/firebase-config';
import { signInWithPopup } from 'firebase/auth';

const API_URL =
  process.env.ENV === 'development'
    ? process.env.API_URL_DEV
    : process.env.API_URL_PROD;

async function getToken() {
  const response = await signInWithPopup(auth, provider);
  return response.user.accessToken;
}

export function logout() {
  document.cookie = `server_token=''; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  localStorage.removeItem('isLoggedIn');
  auth.signOut();
}

export async function postLogin() {
  try {
    const accessToken = await getToken();

    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: `BEARER ${accessToken}`,
      }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Something went wrong.. ${response.status}`);
    }

    localStorage.setItem('isLoggedIn', 'true');

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getUserInformation() {
  const response = await fetch(`${API_URL}/users/user-information`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Something went wrong.. ${response.status}`);
  }

  return await response.json();
}

export async function patchUserInformation(newInformation) {
  const response = await fetch(`${API_URL}/users/new-information`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newInformation,
    }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Something went wrong.. ${response.status}`);
  }

  return await response.json();
}

export function postUserInfoWithClose(newInformation) {
  navigator.sendBeacon(
    `${API_URL}/users/new-information/beacon`,
    JSON.stringify(newInformation),
  );
}

export async function patchProfile(newProfile) {
  const response = await fetch(`${API_URL}/users/profile`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newProfile }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Something went wrong.. ${response.status}`);
  }

  return await response.json();
}
