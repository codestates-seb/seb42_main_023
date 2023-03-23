//TODO: API쿼리에 맞게 수정하기
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { apiSlice } from './apiSlice';

interface Intro {
  intro: string;
}
// mypage header 수정//
export const membersApi = apiSlice.injectEndpoints({
  // tagTypes: ['members'],
  endpoints: (builder) => ({
    getMember: builder.query({
      query: ({ name }) => `members/${name}`,
      // providesTags: (result, error, arg) => {
      //   return [{ type: 'members', id: arg.name }];
      // },
    }),
    //자기소개 수정//
    updateMember: builder.mutation<Intro, { name: string; intro: string }>({
      query: ({ name, intro }) => {
        return {
          url: `members/${name}`,
          method: 'PATCH',
          body: { intro },
        };
      },
      // invalidatesTags: (result, error, arg) => [
      //   { type: 'members', id: arg.name },
      // ],
    }),
  }),
});

// 회원과 관련된 게시글 리스트
export const membersPostListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostList: builder.query({
      query: ({ query }) => `members/${query}/posts`,
    }),
  }),
});
// 회원과 관련된 댓글 리스트
export const membersCommentsListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsList: builder.query({
      query: ({ commentQuery }) => `members/${commentQuery}/comments`,
    }),
  }),
});
