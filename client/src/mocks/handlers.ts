//TODO MSW 핸들러 추가(서버 사이드 코드)
import { rest } from 'msw';
import { replies, postDetail, recomendedPosts, comments } from './postData';

// MSW 핸들러

//--------------------------- GET --------------------------------

export const handlers = [
  // 추천 게시물 조회
  rest.get('/posts/recommend', (req, res, ctx) => {
    const data = recomendedPosts;
    console.log('test', data);
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

  //--------------------------- POST --------------------------------

  // 댓글 추가
  rest.post('/posts/:postId/comments', async (req, res, ctx) => {
    const data = comments;
    const params = req.params;
    const id = params.postId;
    const newData = await req.json();

    data.push({
      postId: Number(id),
      commentId: 123,
      memberName: 'newMember',
      memberImage:
        'data:image/jpeg;base64,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',
      createdAt: String(new Date()),
      modifiedAt: '',
      isModified: false,
      replyCount: 0,
      thumbupCount: 0,
      thumbDownCount: 0,
      isThumbup: false,
      isThumbDown: false,
      content: newData.content,
    });

    return res(ctx.status(200), ctx.json({ data }));
  }),
];
