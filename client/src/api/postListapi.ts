import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './apiSlice';

// 커뮤니티&명예의전당&검색 게시글 API
export const postListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostList: builder.query({
      query: ({
        postSetting = '',
        page = 1,
        orderby = 'latest',
        search = '',
      }) => `posts${postSetting}?page=${page}&orderby=${orderby}${search}`,
    }),
  }),
});

// 주간인기글 API
export const weeklyPopularApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostList: builder.query({
      query: ({ endpoint }) => `posts/${endpoint}`,
    }),
  }),
});
