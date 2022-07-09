import { auth, provider } from '../firebase/firebase-config';
import { signInWithPopup } from 'firebase/auth';

const API_URL =
  process.env.ENV === 'development'
    ? process.env.API_URL_DEV
    : process.env.API_URL_PROD;

export async function getToken() {
  const response = await signInWithPopup(auth, provider);
  return response.user.accessToken;
}

export async function logout() {
  localStorage.removeItem('isLoggedIn');
  auth.signOut();
}

export async function postLogin(accessToken) {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: `BEARER ${accessToken}`,
      }),
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
