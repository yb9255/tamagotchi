require('dotenv').config();
import { rest } from 'msw';

const API_URL =
  process.env.ENV === 'development'
    ? process.env.API_URL_DEV
    : process.env.API_URL_PROD;

const userInformation = {
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
};

export const handlers = [
  rest.post(`${API_URL}/users/login`, (req, res, ctx) => {
    const bearer = req.body.accessToken.split(' ')[0];

    if (bearer !== 'BEARER') {
      return res(
        ctx.json({
          ok: false,
          status: 400,
          message: '로그인 토큰이 존재하지 않습니다.',
        }),
      );
    }

    return res(
      ctx.json({
        ok: true,
        status: 200,
        userInformation,
      }),
    );
  }),

  rest.get(`${API_URL}/users/user-information`, (req, res, ctx) => {
    return res(
      ctx.json({
        ok: true,
        status: 200,
        userInformation,
      }),
    );
  }),

  rest.patch(`${API_URL}/users/profile`, (req, res, ctx) => {
    const { profileName, profileDescription } = req.body.newProfile;

    userInformation.profileName = profileName;
    userInformation.profileDescription = profileDescription;

    return res(
      ctx.json({
        ok: true,
        status: 200,
        profileName: userInformation.profileName,
        profileDescription: userInformation.profileDescription,
      }),
    );
  }),
];
