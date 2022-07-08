import signIn from '../firebase/firebase-config.js';

const API_URL =
  process.env.ENV === 'development'
    ? process.env.API_URL_DEV
    : process.env.API_URL_PROD;

export async function postLogin() {
  const userInfo = await signIn();
  return userInfo;
}
