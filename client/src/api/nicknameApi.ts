import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 닉네임 설정 post
export const nicknameApi = createApi({
  reducerPath: 'nicknameApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://thedragonmoney.com' }),
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
