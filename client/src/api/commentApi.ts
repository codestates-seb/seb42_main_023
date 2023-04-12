import { apiSlice } from './apiSlice';

export const commentsApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Comment'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getComment: builder.query({
        query: ({ postId, page, orderby = 'latest' }) =>
          `posts/${postId}/comments?page=${page}&orderby=${orderby}`,
        providesTags: ['Comment'],
      }),
      setComment: builder.mutation({
        query: ({ postId, content }) => {
          return {
            url: `posts/${postId}/comments`,
            method: 'POST',
            body: { postId, content },
          };
        },
        invalidatesTags: ['Comment'],
      }),
      updateComment: builder.mutation({
        query: ({ postId, commentId, content }) => {
          return {
            url: `/comments/${commentId}`,
            method: 'PATCH',
            body: { postId, content },
          };
        },
        invalidatesTags: ['Comment'],
      }),
      deleteComment: builder.mutation({
        query: ({ commentId }) => {
          return {
            url: `/comments/${commentId}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['Comment'],
      }),
      addCommentThumbUp: builder.mutation({
        query: ({ commentId }) => {
          return {
            url: `comments/${commentId}/thumbup`,
            method: 'POST',
          };
        },
        invalidatesTags: ['Comment'],
      }),
      deleteCommentThumbUp: builder.mutation({
        query: ({ commentId }) => {
          return {
            url: `comments/${commentId}/thumbup`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['Comment'],
      }),
      addCommentThumbDown: builder.mutation({
        query: ({ commentId }) => {
          return {
            url: `comments/${commentId}/thumbdown`,
            method: 'POST',
          };
        },
        invalidatesTags: ['Comment'],
      }),
      deleteCommentThumbDown: builder.mutation({
        query: ({ commentId }) => {
          return {
            url: `comments/${commentId}/thumbdown`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['Comment'],
      }),
    }),
  });
