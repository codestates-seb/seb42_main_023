import { apiSlice } from './apiSlice';

export const recommendedPostsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 추천 게시물 조회
    getRomendedPosts: builder.query({
      query: ({ recommend }) => `posts/${recommend}`,
    }),
  }),
});
