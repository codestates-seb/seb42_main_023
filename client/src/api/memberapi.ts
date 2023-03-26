import { apiSlice } from './apiSlice';

// mypage header 수정//
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
      //회원탈퇴//
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
      //자기소개 수정//
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

// 회원과 관련된 게시글 리스트
export const membersPostListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMemberPostList: builder.query({
      query: ({ query, page }) => `members/${query}/posts?page=${page}`,
    }),
  }),
});
// 회원과 관련된 댓글 리스트
export const membersCommentsListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsList: builder.query({
      query: ({ commentQuery, page }) =>
        `members/${commentQuery}/comments?page=${page}`,
    }),
  }),
});

export const { useDeleteMemberMutation } = membersApi;
