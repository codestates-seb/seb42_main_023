import { rest } from 'msw';
import { posts } from './postListData';
export const postListHandlers = [
  //커뮤니티 게시글 불러오기
  rest.get(`/posts`, (req, res, ctx) => {
    const data = posts;
    return res(ctx.status(200), ctx.json(data));
  }),
];
