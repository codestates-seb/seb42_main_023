import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 답글 API
export const repliesApi = createApi({
  reducerPath: 'repliesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Reply'],
  endpoints: (builder) => ({
    // 답글 조회
    getReply: builder.query({
      query: ({ commentId }) => `comments/${commentId}/replies`,
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
