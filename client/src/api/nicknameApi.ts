import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const nicknameApi = createApi({
  reducerPath: 'nicknameApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_ADDRESS }),
  endpoints: (builder) => ({
    // 닉네임 중복 검사
    getNickname: builder.query({
      query: ({ name }) => `members/${name}/nickname-duplicate-check`,
    }),
    // 닉네임 저장
    patchNickname: builder.mutation({
      query: ({ name, tempName }) => {
        return {
          url: `members/nickname`,
          method: 'PATCH',
          body: { name, tempName },
        };
      },
    }),
  }),
});

export const { useGetNicknameQuery, usePatchNicknameMutation } = nicknameApi;
