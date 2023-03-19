//TODO MSW 핸들러 추가(서버 사이드 코드)
import { rest } from 'msw';
import {
  replies,
  postDetail,
  recomendedPosts,
  comments,
  pages,
} from './postData';

// MSW 핸들러
export const handlers = [
  // 추천 게시물 조회
  rest.get('/posts/recommend', (req, res, ctx) => {
    const data = recomendedPosts;
    const params = req.params;
    return res(ctx.status(200), ctx.json(data));
  }),

  //  게시글 상세 조회
  rest.get('/posts/:postId', (req, res, ctx) => {
    const data = postDetail;
    const params = req.params;
    const id = params.postId;
    // postId값에 따라 필터링
    const filtered = data.filter((el) => {
      return el.postId === Number(id);
    });
    const result = {
      pageInfo: {
        page: 1,
        size: 10,
        totalElement: 123,
        totalPage: 13,
      },
      posts: filtered,
    };
    return res(ctx.status(200), ctx.json(result));
  }),

  // 댓글 조회
  rest.get('/posts/:postId/comments', (req, res, ctx) => {
    const data = comments;
    const params = req.params;
    console.log(params);
    const id = params.postId;
    console.log('comments!!!!!');
    // 답글 id값에 따른 필터링
    const filtered = data.filter((el) => {
      return el.postId === Number(id);
    });
    const result = {
      pageInfo: {
        page: 1,
        size: 10,
        totalElement: 123,
        totalPage: 13,
      },
      comment: filtered,
    };
    return res(ctx.status(200), ctx.json(result));
  }),

  // id별 답글 조회
  rest.get(`/comments/:commentId/replies`, (req, res, ctx) => {
    const data = replies;
    const params = req.params;
    const id = params.commentId;
    // 답글 id값에 따른 필터링
    const filtered = data.filter((el) => {
      return el.commentId === Number(id);
    });
    const result = {
      pageInfo: {
        page: 1,
        size: 10,
        totalElement: 123,
        totalPage: 13,
      },
      comment: filtered,
    };
    return res(ctx.status(200), ctx.json(result));
  }),

  //페이지데이터 불러오기
  rest.get(`/posts`, (req, res, ctx) => {
    const data = pages;
    console.log('test', data);
    return res(ctx.status(200), ctx.json(data));
  }),
];
