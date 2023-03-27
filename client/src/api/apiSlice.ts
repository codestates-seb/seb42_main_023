import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

// Default baseQuery: 모든 요청에 access token을 보낸다.
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_SERVER_ADDRESS,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const accessToken = Cookies.get('Authorization');
    if (accessToken) {
      headers.set('Authorization', accessToken);
    }
    return headers;
  },
});

// 권한 관련 오류와 access token 이 만료되었을때 실행하는 refresh token flow
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  type ErrorResHeader = {
    status: number;
    message: string;
  };

  // 접근 권한이 없는 경우 (일반 유저가 관리자 페이지로 들어갔을때)
  if (
    result?.error?.status === 403 &&
    (result?.error?.data as ErrorResHeader)?.message === 'User unauthorized'
  ) {
    alert('접근할 수 없는 페이지입니다.');
  }

  // 기타 인증과정 오류 발생 (내가 쓴 글이 아닌데 삭제나 수정할때)
  if (
    result?.error?.status === 403 &&
    (result?.error?.data as ErrorResHeader)?.message === 'Authorized Fail'
  ) {
    alert('요청을 수행할 수 없습니다.');
  }

  // access token이 만료되었다는 status와 메세지를 받으면, 새로운 access token 발급을 위해 refresh token 보내기
  if (
    result?.error?.status === 401 &&
    (result?.error?.data as ErrorResHeader)?.message === 'Access token expired'
  ) {
    const name = localStorage.getItem('name');

    const refreshResult = await baseQuery(
      {
        url: `/auth/refresh/${name}`,
        method: 'POST',
        headers: {
          Refresh: Cookies.get('Refresh'),
        },
      },
      api,
      extraOptions,
    );

    // response headers로 온 새로운 access token에 접근하기
    const headers = refreshResult?.meta?.response?.headers;
    const accessToken = headers?.get('Authorization');

    // accessToken이 있다면 쿠키에 저장하고 다시 api 요청하기
    if (accessToken) {
      Cookies.set('Authorization', accessToken!);
      result = await baseQuery(args, api, extraOptions);
    } else {
      //만약 refresh token도 만료되어 acces token이 없다면 로그아웃 시키기.
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
