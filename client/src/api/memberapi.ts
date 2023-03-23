//TODO: API쿼리에 맞게 수정하기
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

interface Intro {
  intro: string;
}
// mypage header 수정//
export const membersApi = createApi({
  reducerPath: 'membersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers) => {
      const accsessToken = Cookies.get('Authorization');
      headers.set('Content-Type', 'application/json');
      headers.set('Authorization', String(accsessToken));
      return headers;
    },
  }),
  tagTypes: ['members'],
  endpoints: (builder) => ({
    getMember: builder.query({
      query: ({ name }) => `members/${name}`,
      providesTags: (result, error, arg) => {
        return [{ type: 'members', id: arg.name }];
      },
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
      invalidatesTags: (result, error, arg) => [
        { type: 'members', id: arg.name },
      ],
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
      query: ({ query }) => `members/${query}/posts`,
      providesTags: (result, error, arg) => {
        return [{ type: 'membersPostList', id: arg.query }];
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
    getCommentsList: builder.query({
      query: ({ commentQuery }) => `members/${commentQuery}/comments`,
      providesTags: (result, error, arg) => {
        return [{ type: 'membersCommentsList', id: arg.commentQuery }];
      },
    }),
  }),
});
