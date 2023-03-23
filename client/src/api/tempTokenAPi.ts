import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

// tempToken post
export const tempTokenApi = createApi({
  reducerPath: 'tempTokenApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_ADDRESS }),
  tagTypes: ['nickname'],
  endpoints: (builder) => ({
    postTempToken: builder.mutation({
      query: ({ tempAccessToken }) => ({
        url: '/auth/callback/google',
        method: 'POST',
        body: { tempAccessToken },
      }),
      transformResponse: (response, meta, arg) => {
        // RTK query에서 response header를 access한다.
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
      },
    }),
  }),
});

export const { usePostTempTokenMutation } = tempTokenApi;
