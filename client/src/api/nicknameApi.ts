import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// QueryArg
interface Return {
  name: string;
  tempName: string;
}

// 닉네임 설정 post
export const nicknameApi = createApi({
  reducerPath: 'nicknameApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_ADDRESS }),
  tagTypes: ['nickname'],
  endpoints: (builder) => ({
    postNickname: builder.mutation<any, Return>({
      query: ({ name, tempName }) => ({
        url: '/members/duplicated-name',
        method: 'POST',
        body: { name, tempName },
      }),
    }),
  }),
});

export const { usePostNicknameMutation } = nicknameApi;
