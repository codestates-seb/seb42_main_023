//TODO: API쿼리에 맞게 수정하기
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// 회원정보 불러오기
export const membersApi = createApi({
  reducerPath: 'membersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['members'],
  endpoints: (builder) => ({
    getPostList: builder.query({
      query: ({ name }) => `members/${name}`,
      providesTags: (result, error, arg) => {
        console.log(result, error, arg);
        return [{ type: 'members', id: arg.recommend }];
      },
    }),
  }),
});

// 회원과 관련된 게시글 리스트
export const membersPostListApi = createApi({
  reducerPath: 'membersPostListApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['membersPostList'],
  endpoints: (builder) => ({
    getPostList: builder.query({
      query: ({ name }) => `members/${name}/posts`,
      providesTags: (result, error, arg) => {
        return [{ type: 'membersPostList', id: arg.recommend }];
      },
    }),
  }),
});
// 회원과 관련된 댓글 리스트
export const membersCommentsListApi = createApi({
  reducerPath: 'membersCommentsListApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['membersCommentsList'],
  endpoints: (builder) => ({
    getPostList: builder.query({
      query: ({ name }) => `members/${name}/comments`,
      providesTags: (result, error, arg) => {
        return [{ type: 'membersCommentsList', id: arg.recommend }];
      },
    }),
  }),
});
// 북마크한 글 불러오기
export const membersBookmarkListApi = createApi({
  reducerPath: 'membersBookmarkListApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['membersBookmarkList'],
  endpoints: (builder) => ({
    getPostList: builder.query({
      query: ({ name }) => `members/${name}/bookmark`,
      providesTags: (result, error, arg) => {
        return [{ type: 'membersBookmarkList', id: arg.recommend }];
      },
    }),
  }),
});
