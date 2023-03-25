import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const url = process.env.REACT_APP_SERVER_ADDRESS;

// 추천 게시물글 API
export const recomendedPostsApi = createApi({
  reducerPath: 'recomendedPostsApi',
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
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    // 인증 정보 전송
    credentials: 'include',
    prepareHeaders: (headers) => {
      const accsessToken = Cookies.get('Authorization');
      headers.set('Content-Type', 'application/json');
      headers.set('Authorization', String(accsessToken));
      return headers;
    },
  }),
  tagTypes: ['Post'],
  // 게시글 조회
  endpoints: (builder) => ({
    getPost: builder.query({
      query: ({ postId }) => `posts/${postId}`,
      providesTags: (result, error, arg) => {
        console.log(result, error, arg);
        console.log('test');
        return [{ type: 'Post', id: 'post' }];
      },
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
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: 'post' }],
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
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: 'post' }],
    }),
    // 게시글 삭제
    deletePost: builder.mutation({
      query: ({ postId }) => {
        return {
          url: `posts/${postId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: 'post' }],
    }),
    // 게시글 좋아요 추가
    addThumbUp: builder.mutation({
      query: ({ postId }) => {
        return {
          url: `posts/${postId}/thumbup`,
          method: 'POST',
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: 'post' }],
    }),
    // 게시글 좋아요 제거
    removeThumbUp: builder.mutation({
      query: ({ postId }) => {
        return {
          url: `posts/${postId}/thumbup`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: 'post' }],
    }),
    // 게시글 싫어요  추가
    addThumbDown: builder.mutation({
      query: ({ postId }) => {
        return {
          url: `posts/${postId}/thumbdown`,
          method: 'POST',
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: 'post' }],
    }),
    // 게시글 싫어요 제거
    removeThumbDown: builder.mutation({
      query: ({ postId }) => {
        return {
          url: `posts/${postId}/thumbdown`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: 'post' }],
    }),
    // 북마크 추가
    addBookmark: builder.mutation({
      query: ({ memberName, postId }) => {
        return {
          url: `members/${memberName}/bookmark/posts/${postId}`,
          method: 'POST',
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: 'post' }],
    }),

    // 북마크 제거
    removeBookmark: builder.mutation({
      query: ({ memberName, postId }) => {
        return {
          url: `members/${memberName}/bookmark/posts/${postId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: 'post' }],
    }),
  }),
});
