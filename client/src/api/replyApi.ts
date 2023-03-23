import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const url = process.env.REACT_APP_SERVER_ADDRESS;

// 답글 API
export const repliesApi = createApi({
  reducerPath: 'repliesApi',
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
  tagTypes: ['Reply'],
  endpoints: (builder) => ({
    // 답글 조회
    getReply: builder.query({
      query: ({ commentId, page }) =>
        `comments/${commentId}/replies?page=1&orderby=thumbup`,
      providesTags: (result, error, arg) => {
        return [{ type: 'Reply', id: 'reply' }];
      },
    }),
    // 답글 추가
    setReply: builder.mutation({
      query: ({ commentId, content }) => {
        return {
          url: `comments/${commentId}/replies`,
          method: 'POST',
          body: { commentId, content },
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Reply', id: 'reply' }],
    }),
    // 답글 수정
    updataReply: builder.mutation({
      query: ({ replyId, content }) => {
        return {
          url: `replies/${replyId}`,
          method: 'PATCH',
          body: { replyId, content },
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Reply', id: 'reply' }],
    }),
    // 답글 삭제
    deleteReply: builder.mutation({
      query: ({ replyId }) => {
        console.log('id', replyId);
        return {
          url: `replies/${replyId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Reply', id: 'reply' }],
    }),
    // 답글 좋아요 추가
    addThumbUp: builder.mutation({
      query: ({ replyId }) => {
        return {
          url: `posts/${replyId}/thumbup`,
          method: 'POST',
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Reply', id: 'reply' }],
    }),
    // 답글 좋아요 제거
    removeThumbUp: builder.mutation({
      query: ({ replyId }) => {
        return {
          url: `posts/${replyId}/thumbup`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Reply', id: 'reply' }],
    }),
    // 답글 싫어요 추가
    addThumbDown: builder.mutation({
      query: ({ replyId }) => {
        return {
          url: `posts/${replyId}/thumbdown`,
          method: 'POST',
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Reply', id: 'reply' }],
    }),
    // 답글 싫어요 제거
    removeThumbDown: builder.mutation({
      query: ({ replyId }) => {
        return {
          url: `posts/${replyId}/thumbdown`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Reply', id: 'reply' }],
    }),
  }),
});
