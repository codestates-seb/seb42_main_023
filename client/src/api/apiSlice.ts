import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import Cookies from 'js-cookie';

// // Default baseQuery: 모든 요청에 access token을 보낸다.
// const baseQuery = fetchBaseQuery({
//   baseUrl: 'https://thedragonmoney.com',
//   credentials: 'include',
//   prepareHeaders: (headers) => {
//     const accessToken = Cookies.get('Authorization');
//     if (accessToken) {
//       headers.set('Authorization', accessToken);
//     }
//     return headers;
//   },
// });

// // access token 이 만료되었을때 실행하는 refresh token flow
// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 403) {
//     // 새로운 access token 발급을 위해 refresh token 보내기
//     const nickname = localStorage.getItem('nickname');
//     const refreshResult = await baseQuery(
//       `/auth/refresh/${nickname}`,
//       api,
//       extraOptions,
//     );

//     // response headers로 온 새로운 access token을 쿠키에 저장하기
//     if (refreshResult.meta?.response?.config?.headers) {
//       const accessToken = refreshResult.meta?.response?.headers.authorization;
//       Cookies.set('Authorization', accessToken);

//       // 새로운 accessToken으로 다시 api 요청하기
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       //만약 새롭게 acces token 발급이 안된다면 로그아웃 시키기.
//     }
//   }
//   return result;
// };

// // Wrap baseQuery with the baseQueryWithReauth function
// export const apiSlice = createApi({
//   baseQuery: baseQueryWithReauth,
//   endpoints: (builder) => ({}),
// });
