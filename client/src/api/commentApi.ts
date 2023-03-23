import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const url = process.env.REACT_APP_SERVER_ADDRESS;

// 댓글 API
export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const accsessToken = Cookies.get('Authorization');
      headers.set('Content-Type', 'application/json');
      headers.set('Authorization', String(accsessToken));
      return headers;
    },
  }),
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    // 댓글 조회
    getComment: builder.query({
      query: ({ postId, page }) =>
        `posts/${postId}/comments?page=${page}&orderby=thumbup`,
      providesTags: (result, error, arg) => {
        console.log(result, error, arg);
        return [{ type: 'Comment', id: arg.postId }];
      },
    }),
    // 댓글 추가
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
    // 댓글 수정
    updateComment: builder.mutation({
      query: ({ postId, commentId, content }) => {
        return {
          url: `/comments/${commentId}`,
          method: 'PATCH',
          body: { postId, content },
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Comment', id: arg.postId },
      ],
    }),
    // 댓글 삭제
    deleteComment: builder.mutation({
      query: ({ commentId }) => {
        return {
          url: `/comments/${commentId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Comment', id: arg.postId },
      ],
    }),

    // 댓글 좋아요 추가
    addThumbUp: builder.mutation({
      query: ({ commentId }) => {
        return {
          url: `posts/${commentId}/thumbup`,
          method: 'POST',
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Comment', id: arg.postId },
      ],
    }),
    // 댓글 좋아요 제거
    removeThumbUp: builder.mutation({
      query: ({ commentId }) => {
        return {
          url: `posts/${commentId}/thumbup`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Comment', id: arg.postId },
      ],
    }),
    // 댓글 싫어요 추가
    addThumbDown: builder.mutation({
      query: ({ commentId }) => {
        return {
          url: `posts/${commentId}/thumbdown`,
          method: 'POST',
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Comment', id: arg.postId },
      ],
    }),
    // 댓글 좋아요 제거
    removeThumbDown: builder.mutation({
      query: ({ commentId }) => {
        return {
          url: `posts/${commentId}/thumbdown`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Comment', id: arg.postId },
      ],
    }),
  }),
});
