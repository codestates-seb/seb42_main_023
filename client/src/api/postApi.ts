import { apiSlice } from './apiSlice';

// 추천 게시물글 API
export const recommendedPostsApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['RecomendedPosts'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      // 추천 게시물 조회
      getRomendedPosts: builder.query({
        query: ({ recommend }) => `posts/${recommend}`,
        providesTags: ['RecomendedPosts'],
      }),
    }),
  });

export const postsApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Post'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      // 게시글 조회
      getPost: builder.query({
        query: ({ postId }) => `posts/${postId}`,
        providesTags: ['Post'],
      }),
      // 게시글 추가
      setPost: builder.mutation({
        query: ({ saveImages, title, content, tagNames }) => {
          return {
            url: `posts`,
            method: 'POST',
            body: { saveImages, title, content, tagNames },
          };
        },
        invalidatesTags: ['Post'],
      }),
      // 게시글 수정
      updatePost: builder.mutation({
        query: ({ postId, saveImages, title, content, tagNames }) => {
          return {
            url: `posts/${postId}`,
            method: 'PATCH',
            body: { saveImages, title, content, tagNames },
          };
        },
      }),
      // 게시글 삭제
      deletePost: builder.mutation({
        query: ({ postId }) => {
          return {
            url: `posts/${postId}`,
            method: 'DELETE',
          };
        },
      }),
      //게시글 좋아요 추가
      addPostThumbUp: builder.mutation({
        query: ({ postId }) => {
          return {
            url: `posts/${postId}/thumbup`,
            method: 'POST',
          };
        },
      }),
      //게시글 좋아요 제거
      removePostThumbUp: builder.mutation({
        query: ({ postId }) => {
          return {
            url: `posts/${postId}/thumbup`,
            method: 'DELETE',
          };
        },
      }),
      // 게시글 싫어요 추가
      addPostThumbDown: builder.mutation({
        query: ({ postId }) => {
          return {
            url: `posts/${postId}/thumbdown`,
            method: 'POST',
          };
        },
      }),
      // 게시글 싫어요 제거
      removePostThumbDown: builder.mutation({
        query: ({ postId }) => {
          return {
            url: `posts/${postId}/thumbdown`,
            method: 'DELETE',
          };
        },
      }),
      // 북마크 추가
      addBookmark: builder.mutation({
        query: ({ loginUserName, postId }) => {
          return {
            url: `members/${loginUserName}/bookmark/posts/${postId}`,
            method: 'POST',
          };
        },
      }),

      // 북마크 제거
      removeBookmark: builder.mutation({
        query: ({ loginUserName, postId }) => {
          return {
            url: `members/${loginUserName}/bookmark/posts/${postId}`,
            method: 'DELETE',
          };
        },
      }),
    }),
  });
