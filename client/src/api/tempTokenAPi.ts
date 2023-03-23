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
        const headers = meta?.response?.headers;
        console.log('Authorization', headers?.get('Authorization'));
        console.log('Refresh', headers?.get('Refresh'));

        const accessToken = headers?.get('Authorization');

        if (accessToken) {
          Cookies.set('Authorization', accessToken);
        }

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
