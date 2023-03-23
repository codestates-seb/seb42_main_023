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
      console.log(accsessToken);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    // 댓글 조회
    getComment: builder.query({
      query: ({ postId }) => `posts/${postId}/comments`,
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
  }),
});
