import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 추천 게시물글 API
export const recomendedPostsApi = createApi({
  reducerPath: 'recomendedPostsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['RecomendedPosts'],
  endpoints: (builder) => ({
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
  endpoints: (builder) => ({
    getPost: builder.query({
      query: ({ postId }) => `posts/${postId}`,
      providesTags: (result, error, arg) => {
        console.log(result, error, arg);
        return [{ type: 'Post', id: arg.postId }];
      },
    }),
    setPost: builder.mutation({
      query: ({ postId }) => {
        return {
          url: `posts/${postId}`,
          method: 'POST',
          body: { postId },
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Post', id: arg.postId },
      ],
    }),
  }),
});

// 댓글 API
export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    getComment: builder.query({
      query: ({ postId }) => `posts/${postId}/comments`,
      providesTags: (result, error, arg) => {
        console.log(result, error, arg);
        return [{ type: 'Comment', id: arg.postId }];
      },
    }),
    setComment: builder.mutation({
      query: ({ postId, content }) => {
        return {
          url: `posts/${postId}/comments`,
          method: 'POST',
          body: { postId, content },
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Comment', id: arg.postId },
      ],
    }),
  }),
});

// 답글 API
export const repliesApi = createApi({
  reducerPath: 'repliesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Reply'],
  endpoints: (builder) => ({
    getReply: builder.query({
      query: ({ commentId }) => `comments/${commentId}/replies`,
      providesTags: (result, error, arg) => {
        console.log(result, error, arg);
        return [{ type: 'Reply', id: arg.commentId }];
      },
    }),
    setReply: builder.mutation({
      query: ({ commentId }) => {
        return {
          url: `comments/${commentId}/replies`,
          method: 'POST',
          body: { commentId },
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Reply', id: arg.commentId },
      ],
    }),
  }),
});
