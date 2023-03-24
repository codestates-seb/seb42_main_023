import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './apiSlice';
import Cookies from 'js-cookie';

// 커뮤니티 게시글 API
export const postListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostList: builder.query(
      //posts/search?page=1&orderby=latest&keyword=''&tags=['','']
      {
        query: ({ postSetting = '', page = 1, orderby = 'latest' }) =>
          `posts${postSetting}?page=${page}&orderby=${orderby}`,
      },
      // {
      //   query: ({ comunity = '' }) => `posts`,
      // },
    ),
  }),
});

// 주간인기글 API
export const weeklyPopularApi = createApi({
  reducerPath: 'weeklyPopularApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_ADDRESS }),
  endpoints: (builder) => ({
    getPostList: builder.query({
      query: ({ endpoint }) => `posts/${endpoint}`,
    }),
  }),
});
// 검색 API
export const SearchApi = createApi({
  reducerPath: 'SearchApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_ADDRESS }),
  tagTypes: ['Search'],
  endpoints: (builder) => ({
    getPostList: builder.query({
      //posts/search?page=1&orderby=latest&keyword=''&tags=['','']
      query: ({ page, orderby, keyword, tags }) =>
        `posts/search?page=${page}&orderby=${orderby}&keyword=${keyword}&tags=${tags}`,
      providesTags: (result, error, arg) => {
        return [{ type: 'Search', id: arg.endpoint }];
      },
    }),
  }),
});
