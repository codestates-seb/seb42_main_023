import { apiSlice } from './apiSlice';

export const recomendedPostsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 추천 게시물 조회
    getRomendedPosts: builder.query({
      query: ({ recommend }) => `posts/${recommend}`,
    }),
  }),
});
// 게시글 API
export const postsApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['post'] })
  .injectEndpoints({
    // 게시글 조회
    endpoints: (builder) => ({
      getPost: builder.query({
        query: ({ postId }) => `posts/${postId}`,
        providesTags: ['post'],
      }),
      // 게시글 추가
      setPost: builder.mutation({
        query: ({ images, title, content, tags }) => {
          return {
            url: `posts`,
            method: 'POST',
            body: { images, title, content, tags },
          };
        },
        invalidatesTags: ['post'],
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
        invalidatesTags: ['post'],
      }),
      // 게시글 삭제
      deletePost: builder.mutation({
        query: ({ postId }) => {
          return {
            url: `posts/${postId}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['post'],
      }),
      // 게시글 좋아요 추가
      addThumbUp: builder.mutation({
        query: ({ postId }) => {
          return {
            url: `posts/${postId}/thumbup`,
            method: 'POST',
          };
        },
        invalidatesTags: ['post'],
      }),
      // 게시글 좋아요 제거
      removeThumbUp: builder.mutation({
        query: ({ postId }) => {
          return {
            url: `posts/${postId}/thumbup`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['post'],
      }),
      // 게시글 싫어요  추가
      addThumbDown: builder.mutation({
        query: ({ postId }) => {
          return {
            url: `posts/${postId}/thumbdown`,
            method: 'POST',
          };
        },
        invalidatesTags: ['post'],
      }),
      // 게시글 싫어요 제거
      removeThumbDown: builder.mutation({
        query: ({ postId }) => {
          return {
            url: `posts/${postId}/thumbdown`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['post'],
      }),
      // 북마크 추가
      addBookmark: builder.mutation({
        query: ({ memberName, postId }) => {
          return {
            url: `members/${memberName}/bookmark/posts/${postId}`,
            method: 'POST',
          };
        },
        invalidatesTags: ['post'],
      }),

      // 북마크 제거
      removeBookmark: builder.mutation({
        query: ({ memberName, postId }) => {
          return {
            url: `members/${memberName}/bookmark/posts/${postId}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['post'],
      }),
    }),
  });
