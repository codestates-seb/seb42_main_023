import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
//TODO:test
// Default baseQuery: 모든 요청에 access token을 보낸다.
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000',
  //   credentials: 'include',
  //   prepareHeaders: (headers) => {
  //     const accessToken = Cookies.get('Authorization');
  //     if (accessToken) {
  //       headers.set('Authorization', accessToken);
  //     }
  //     return headers;
  //   },
});

// access token 이 만료되었을때 실행하는 refresh token flow
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  // 만약 만료된 access token을 보내 403에러를 받으면, 새로운 access token 발급을 위해 refresh token 보내기
  if (result?.error?.status === 403) {
    const name = localStorage.getItem('name');
    const refreshResult = await baseQuery(
      `/auth/refresh/${name}`,
      api,
      extraOptions,
    );
    console.log('refreshResult', refreshResult);

    // response headers로 온 새로운 access token을 쿠키에 저장하기
    const headers = refreshResult?.meta?.response?.headers;
    if (headers) {
      const accessToken = headers?.get('Authorization');
      Cookies.set('Authorization', accessToken!);

      // 새로운 accessToken으로 다시 api 요청하기
      result = await baseQuery(args, api, extraOptions);
    } else {
      //만약 새롭게 acces token 발급이 안된다면 로그아웃 시키기.
      Cookies.remove('Authorization');
      Cookies.remove('Refresh');
      localStorage.clear();
      window.location.href = '/';
    }
  }
  return result;
};

// Wrap baseQuery with the baseQueryWithReauth function
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
