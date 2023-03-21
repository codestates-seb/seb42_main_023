import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 추천 게시물글 API
export const recomendedPostsApi = createApi({
  reducerPath: 'recomendedPostsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['RecomendedPosts'],
  endpoints: (builder) => ({
    // 추천 게시물 조회
    getRomendedPosts: builder.query({
      query: ({ recommend }) => `posts/${recommend}`,
      providesTags: (result, error, arg) => {
        console.log(result, error, arg);
        return [{ type: 'RecomendedPosts', id: arg.recommend }];
      },
    }),
  }),
});

// 게시글 API
export const postsApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Post'],
  // 게시글 조회
  endpoints: (builder) => ({
    getPost: builder.query({
      query: ({ postId }) => `posts/${postId}`,
      providesTags: (result, error, arg) => {
        console.log(result, error, arg);
        return [{ type: 'Post', id: arg.postId }];
      },
    }),
    //TODO 정적 URI 한번 더 확인하기('posts')
    // 게시글 추가
    setPost: builder.mutation({
      query: ({ title, content, tag }) => {
        return {
          url: `posts`,
          method: 'POST',
          body: { title, content, tag },
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Post', id: arg.postId },
      ],
    }),
    // 게시글 수정
    updatePost: builder.mutation({
      query: ({ postId, title, content }) => {
        return {
          url: `posts/${postId}`,
          method: 'PATCH',
          body: { title, content },
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Post', id: arg.postId },
      ],
    }),
    // 게시글 삭제
    deletePost: builder.mutation({
      query: ({ postId }) => {
        return {
          url: `posts/${postId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Post', id: arg.postId },
      ],
    }),
  }),
});
