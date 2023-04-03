import { apiSlice } from './apiSlice';
// 답글 API
export const repliesApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Reply'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      // 답글 조회
      getReply: builder.query({
        query: ({ commentId, replyPage }) =>
          `comments/${commentId}/replies?page=${replyPage}&orderby=latest`,
        providesTags: ['Reply'],
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
        invalidatesTags: ['Reply'],
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
        invalidatesTags: ['Reply'],
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
        invalidatesTags: ['Reply'],
      }),
      // 답글 좋아요 추가
      addRplyThumbUp: builder.mutation({
        query: ({ replyId }) => {
          return {
            url: `replies/${replyId}/thumbup`,
            method: 'POST',
          };
        },
        invalidatesTags: ['Reply'],
      }),
      // 답글 좋아요 제거
      removeRplyThumbUp: builder.mutation({
        query: ({ replyId }) => {
          return {
            url: `replies/${replyId}/thumbup`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['Reply'],
      }),
      // 답글 싫어요 추가
      addRplyThumbDown: builder.mutation({
        query: ({ replyId }) => {
          return {
            url: `replies/${replyId}/thumbdown`,
            method: 'POST',
          };
        },
        invalidatesTags: ['Reply'],
      }),
      // 답글 싫어요 제거
      removeRplyThumbDown: builder.mutation({
        query: ({ replyId }) => {
          return {
            url: `replies/${replyId}/thumbdown`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['Reply'],
      }),
    }),
  });
