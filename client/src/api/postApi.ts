import { apiSlice } from './apiSlice';

const deleteImgEP = process.env.REACT_APP_SERVER_ADDRESS + '/images/drop';

export const recommendedPostsApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['RecomendedPosts'] })
  .injectEndpoints({
    endpoints: (builder) => ({
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
      getPost: builder.query({
        query: ({ postId }) => `posts/${postId}`,
        providesTags: ['Post'],
      }),

      addPost: builder.mutation({
        query: ({ saveImages, title, content, tagNames }) => {
          return {
            url: `posts`,
            method: 'POST',
            body: { saveImages, title, content, tagNames },
          };
        },
        invalidatesTags: ['Post'],
      }),

      updatePost: builder.mutation({
        query: ({ postId, saveImages, title, content, tagNames }) => {
          return {
            url: `posts/${postId}`,
            method: 'PATCH',
            body: { saveImages, title, content, tagNames },
          };
        },
      }),

      deletePost: builder.mutation({
        query: ({ postId }) => {
          return {
            url: `posts/${postId}`,
            method: 'DELETE',
          };
        },
      }),
      // 이미지 추가
      // addImages: builder.mutation({
      //   query: ({ postId }) => {
      //     return {
      //       url: `posts/${postId}`,
      //       method: 'POST',
      //     };
      //   },
      // }),

      deleteImages: builder.mutation({
        query: ({ deletedImg }) => {
          return {
            url: deleteImgEP,
            method: 'POST',
            body: deletedImg,
          };
        },
      }),

      addPostThumbUp: builder.mutation({
        query: ({ postId }) => {
          return {
            url: `posts/${postId}/thumbup`,
            method: 'POST',
          };
        },
      }),

      deletePostThumbUp: builder.mutation({
        query: ({ postId }) => {
          return {
            url: `posts/${postId}/thumbup`,
            method: 'DELETE',
          };
        },
      }),

      addPostThumbDown: builder.mutation({
        query: ({ postId }) => {
          return {
            url: `posts/${postId}/thumbdown`,
            method: 'POST',
          };
        },
      }),

      deletePostThumbDown: builder.mutation({
        query: ({ postId }) => {
          return {
            url: `posts/${postId}/thumbdown`,
            method: 'DELETE',
          };
        },
      }),

      addBookmark: builder.mutation({
        query: ({ loginUserName, postId }) => {
          return {
            url: `members/${loginUserName}/bookmark/posts/${postId}`,
            method: 'POST',
          };
        },
      }),

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
