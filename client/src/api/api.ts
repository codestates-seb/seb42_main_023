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

// 댓글 API
export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    // 댓글 조회
    getComment: builder.query({
      query: ({ postId }) => `posts/${postId}/comments`,
      providesTags: (result, error, arg) => {
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

// 신고 API
export const reportApi = createApi({
  reducerPath: 'reportApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Report'],
  endpoints: (builder) => ({
    // 신고 조회
    getReport: builder.query({
      query: ({}) => `reports`,
      providesTags: (result, error, arg) => {
        return [{ type: 'Report', id: 'report' }];
      },
    }),
    // 신고 추가
    setReport: builder.mutation({
      query: ({
        reportReason,
        description,
        targetType,
        postId,
        commentId,
        replyId,
        reporterName,
      }) => {
        return {
          url: `reports`,
          method: 'POST',
          body: { targetType },
        };
      },

      invalidatesTags: (result, error, arg) => [
        { type: 'Report', id: 'report' },
      ],
    }),
  }),
});
