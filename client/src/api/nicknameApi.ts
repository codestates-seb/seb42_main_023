import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 닉네임 설정 post
export const nicknameApi = createApi({
  reducerPath: 'nicknameApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_ADDRESS,
  }),
  tagTypes: ['nickname'],
  endpoints: (builder) => ({
    postNickname: builder.mutation({
      query: ({ name, tempName }) => ({
        url: '/members/duplicated-name',
        method: 'POST',
        body: { name, tempName },
      }),
    }),
  }),
});

export const { usePostNicknameMutation } = nicknameApi;
