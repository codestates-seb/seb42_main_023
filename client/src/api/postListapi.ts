import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// 커뮤니티 게시글 API
export const postListApi = createApi({
  reducerPath: 'postListApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['PostList'],
  endpoints: (builder) => ({
    getPostList: builder.query({
      query: ({ endpoint }) => `posts/${endpoint}`,
      providesTags: (result, error, arg) => {
        return [{ type: 'PostList', id: arg.recommend }];
      },
    }),
  }),
});
// 주간인기글 API
export const weeklyPopularApi = createApi({
  reducerPath: 'weeklyPopularApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['weeklyPopular'],
  endpoints: (builder) => ({
    getPostList: builder.query({
      query: ({ endpoint }) => `posts/${endpoint}`,
      providesTags: (result, error, arg) => {
        return [{ type: 'weeklyPopular', id: arg.recommend }];
      },
    }),
  }),
});
