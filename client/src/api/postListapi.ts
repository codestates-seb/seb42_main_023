import { apiSlice } from './apiSlice';

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

export const weeklyPopularApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWeekPostList: builder.query({
      query: ({ endpoint }) => `posts/${endpoint}`,
    }),
  }),
});
