import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

// 임시 토큰을 서버에 보내고, 응답헤더로 온 access와 refresh토큰을 쿠키에 저장한다.
const transformResponse = (response: any, meta: any, arg: any) => {
  // response header를 access한다.
  const headers = meta?.response?.headers;

  // access token을 쿠키에 저장한다.
  const accessToken = headers?.get('Authorization');
  if (accessToken) {
    Cookies.set('Authorization', accessToken);
  }

  // refresh token을 쿠키에 저장한다.
  const refreshToken = headers?.get('Refresh');
  if (refreshToken) {
    Cookies.set('Refresh', refreshToken);
  }

  return response;
};

// tempToken post
export const tempTokenApi = createApi({
  reducerPath: 'tempTokenApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_ADDRESS }),
  endpoints: (builder) => ({
    // 회원가입을 완료한 유저가 로그인 했을때
    postTempToken: builder.mutation({
      query: ({ tempAccessToken }) => ({
        url: '/auth/callback/google',
        method: 'POST',
        body: { tempAccessToken },
      }),
      transformResponse,
    }),
    // 이전에 회원탈퇴를 한 기록이 있는 유저가 로그인 했을때
    postTempTokenRecovery: builder.mutation({
      query: ({ tempAccessToken }) => ({
        url: '/comeback',
        method: 'POST',
        body: { tempAccessToken },
      }),
      transformResponse,
    }),
  }),
});

export const { usePostTempTokenMutation, usePostTempTokenRecoveryMutation } =
  tempTokenApi;
