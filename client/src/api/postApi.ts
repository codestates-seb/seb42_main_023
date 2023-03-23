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
      console.log(accsessToken);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['RecomendedPosts'],
  endpoints: (builder) => ({
    // 추천 게시물 조회
    getRomendedPosts: builder.query({
      query: ({ recommend }) => `posts/${recommend}`,
      providesTags: (result, error, arg) => {
        console.log(result, error, arg);
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
      const token = Cookies.get();
      headers.set('Content-Type', 'application/json');
      // headers.set('Authorization', cookie);
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

      //TODO  req, res 관리
      transformResponse: (response, meta, arg) => {
        const headers = meta?.response?.headers;
        console.log('content-type', headers?.get('x-powered-by'));
        return response;
      },

      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg,
      ) => response.status,
    }),

    // 게시글 추가
    setPost: builder.mutation({
      query: ({ saveIages, title, content, tagNames }) => {
        return {
          url: `posts`,
          method: 'POST',
          body: { saveIages, title, content, tagNames },
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
  }),
});
