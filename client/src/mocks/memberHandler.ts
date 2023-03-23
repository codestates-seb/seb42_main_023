import { rest } from 'msw';
import { replies } from './postData';
import { posts, thumupPosts } from './postListData';
import { members } from './memberData';
export const memberHandlers = [
  //특정회원 정보 불러오기
  rest.get(`/members/bunny`, (req, res, ctx) => {
    const data = members;
    return res(ctx.status(200), ctx.json(data));
  }),
  //특정회원 게시글 불러오기
  rest.get(`/members/bunny/posts`, (req, res, ctx) => {
    const data = posts;
    return res(ctx.status(200), ctx.json(data));
  }),
  //특정회원 댓글 불러오기
  rest.get(`/members/bunny/comments`, (req, res, ctx) => {
    const data = replies;
    return res(ctx.status(200), ctx.json(data));
  }),
  //특정회원이 좋아요한 글 불러오기
  rest.get(`/members/bunny/thumbup/posts`, (req, res, ctx) => {
    const data = thumupPosts;
    return res(ctx.status(200), ctx.json(data));
  }),
  //특정회원 좋아요한 댓글 불러오기
  rest.get(`/members/bunny/thumbup/comments`, (req, res, ctx) => {
    const data = replies;
    return res(ctx.status(200), ctx.json(data));
  }),
  //특정회원 북마크한글 불러오기
  rest.get(`/members/bunny/bookmark`, (req, res, ctx) => {
    const data = posts;
    return res(ctx.status(200), ctx.json(data));
  }),
  //자기소개 수정
  rest.patch('/members/bunny', async (req, res, ctx) => {
    const newData = await req.json();
    const data = members;
    const result = { ...data, ...newData };

    return res(ctx.status(200), ctx.json(result));
  }),
];
