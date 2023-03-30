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

//   import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// import Cookies from 'js-cookie';

// const url = process.env.REACT_APP_SERVER_ADDRESS;

// // 게시글 API
// export const postsApi = createApi({
//   reducerPath: 'postApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: url,
//     // 인증 정보 전송
//     credentials: 'include',
//     prepareHeaders: (headers) => {
//       const accsessToken = Cookies.get('Authorization');
//       headers.set('Content-Type', 'application/json');
//       headers.set('Authorization', String(accsessToken));
//       return headers;
//     },
//   }),
//   tagTypes: ['Post'],
//   // 게시글 조회
//   endpoints: (builder) => ({
//     getPost: builder.query({
//       query: ({ postId }) => `posts/${postId}`,
//       providesTags: (result, error, arg) => {
//         console.log(result, error, arg);
//         console.log('test');
//         return [{ type: 'Post', id: 'post' }];
//       },
//     }),

//     // 게시글 추가
//     setPost: builder.mutation({
//       query: ({ saveImages, title, content, tagNames }) => {
//         return {
//           url: `posts`,
//           method: 'POST',
//           body: { saveImages, title, content, tagNames },
//         };
//       },
//       // invalidatesTags: [{ type: 'Post', id: 'post' }],
//     }),
//     // 게시글 수정
//     updatePost: builder.mutation({
//       query: ({ postId, saveImages, title, content, tagNames }) => {
//         return {
//           url: `posts/${postId}`,
//           method: 'PATCH',
//           body: { saveImages, title, content, tagNames },
//         };
//       },
//       // invalidatesTags: [{ type: 'Post', id: 'post' }],
//     }),
//     // 게시글 삭제
//     deletePost: builder.mutation({
//       query: ({ postId }) => {
//         return {
//           url: `posts/${postId}`,
//           method: 'DELETE',
//         };
//       },
//     }),
//     // 게시글 좋아요 추가
//     addThumbUp: builder.mutation({
//       query: ({ postId }) => {
//         return {
//           url: `posts/${postId}/thumbup`,
//           method: 'POST',
//         };
//       },
//     }),
//     // 게시글 좋아요 제거
//     removeThumbUp: builder.mutation({
//       query: ({ postId }) => {
//         return {
//           url: `posts/${postId}/thumbup`,
//           method: 'DELETE',
//         };
//       },
//     }),
//     // 게시글 싫어요  추가
//     addThumbDown: builder.mutation({
//       query: ({ postId }) => {
//         return {
//           url: `posts/${postId}/thumbdown`,
//           method: 'POST',
//         };
//       },
//     }),
//     // 게시글 싫어요 제거
//     removeThumbDown: builder.mutation({
//       query: ({ postId }) => {
//         return {
//           url: `posts/${postId}/thumbdown`,
//           method: 'DELETE',
//         };
//       },
//     }),
//     // 북마크 추가
//     addBookmark: builder.mutation({
//       query: ({ loginUserName, postId }) => {
//         return {
//           url: `members/${loginUserName}/bookmark/posts/${postId}`,
//           method: 'POST',
//         };
//       },
//     }),

//     // 북마크 제거
//     removeBookmark: builder.mutation({
//       query: ({ loginUserName, postId }) => {
//         return {
//           url: `members/${loginUserName}/bookmark/posts/${postId}`,
//           method: 'DELETE',
//         };
//       },
//     }),
//   }),
// });
