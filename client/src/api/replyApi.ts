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
        `comments/${commentId}/replies?page=${page}&orderby=thumbup`,
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
  }),
});
