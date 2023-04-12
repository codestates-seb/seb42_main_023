import { apiSlice } from './apiSlice';

export const membersApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['members'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getMember: builder.query({
        query: ({ name }) => `members/${name}`,
        providesTags: (result, error, arg) => {
          return [{ type: 'members', id: arg.name }];
        },
      }),
      deleteMember: builder.mutation({
        query: (name) => {
          return {
            url: `members/${name}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: (result, error, arg) => [
          { type: 'members', id: arg.name },
        ],
      }),
      updateMember: builder.mutation({
        query: ({ name, intro }) => {
          return {
            url: `members/${name}`,
            method: 'PATCH',
            body: { intro },
          };
        },
        invalidatesTags: (result, error, arg) => [
          { type: 'members', id: arg.name },
        ],
      }),
    }),
  });

export const membersPostListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMemberPostList: builder.query({
      query: ({ name, page }) => `members/${name}/posts?page=${page}`,
    }),
    getMemberLikePostList: builder.query({
      query: ({ name, page }) => `members/${name}/thumbup/posts?page=${page}`,
    }),
    getBookmarkPostList: builder.query({
      query: ({ name, page }) => `members/${name}/bookmark?page=${page}`,
    }),
  }),
});
export const membersCommentsListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsList: builder.query({
      query: ({ name, page }) => `members/${name}/comments?page=${page}`,
    }),
    getLikeCommentsList: builder.query({
      query: ({ name, page }) =>
        `members/${name}/thumbup/comments?page=${page}`,
    }),
  }),
});

export const { useDeleteMemberMutation } = membersApi;
