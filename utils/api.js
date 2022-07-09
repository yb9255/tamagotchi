import signIn from '../firebase/firebase-config.js';

const API_URL =
  process.env.ENV === 'development'
    ? process.env.API_URL_DEV
    : process.env.API_URL_PROD;

export async function postLogin() {
  try {
    const accessToken = await signIn();

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
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
