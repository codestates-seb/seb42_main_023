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
    //내가 쓴 글
    getMemberPostList: builder.query({
      query: ({ name, page }) => `members/${name}/posts?page=${page}`,
    }),
    //내가 좋아요한 글
    getMemberLikePostList: builder.query({
      query: ({ name, page }) => `members/${name}/thumbup/posts?page=${page}`,
    }),
    //내가 북마크한 글
    getBookmarkPostList: builder.query({
      query: ({ name, page }) => `members/${name}/bookmark?page=${page}`,
    }),
  }),
});
// 회원과 관련된 댓글 리스트
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
