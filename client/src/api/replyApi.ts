import { apiSlice } from './apiSlice';
export const repliesApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Reply'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getReply: builder.query({
        query: ({ commentId, replyPage }) =>
          `comments/${commentId}/replies?page=${replyPage}&orderby=latest`,
        providesTags: ['Reply'],
      }),

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

      addReplyThumbUp: builder.mutation({
        query: ({ replyId }) => {
          return {
            url: `replies/${replyId}/thumbup`,
            method: 'POST',
          };
        },
        invalidatesTags: ['Reply'],
      }),

      deleteReplyThumbUp: builder.mutation({
        query: ({ replyId }) => {
          return {
            url: `replies/${replyId}/thumbup`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['Reply'],
      }),

      addReplyThumbDown: builder.mutation({
        query: ({ replyId }) => {
          return {
            url: `replies/${replyId}/thumbdown`,
            method: 'POST',
          };
        },
        invalidatesTags: ['Reply'],
      }),

      deleteReplyThumbDown: builder.mutation({
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
