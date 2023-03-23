import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { env } from 'process';
// 커뮤니티 게시글 API
export const postListApi = createApi({
  reducerPath: 'postListApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_ADDRESS }),
  tagTypes: ['PostList'],
  endpoints: (builder) => ({
    getPostList: builder.query({
      //TODO: API쿼리에 맞게 수정하기
      //----커뮤니티----
      //posts?page=1&orderby='latest'
      //Content-Type:application/json
      //----명예의전당---
      //posts/best-awards?page=1&orderby='latest'
      query: ({ comunity = '', page, orderby }) =>
        `posts${comunity}?page=${page}&orderby=${orderby}`,
      providesTags: (result, error, arg) => {
        return [{ type: 'PostList', id: arg.endpoint }];
      },
    }),
  }),
});
// 주간인기글 API
export const weeklyPopularApi = createApi({
  reducerPath: 'weeklyPopularApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_ADDRESS }),
  tagTypes: ['weeklyPopular'],
  endpoints: (builder) => ({
    getPostList: builder.query({
      query: ({ endpoint }) => `posts/${endpoint}`,
      providesTags: (result, error, arg) => {
        return [{ type: 'weeklyPopular', id: arg.endpoint }];
      },
    }),
  }),
});
