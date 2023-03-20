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
        'https://image.edaily.co.kr/images/Photo/files/NP/S/2021/06/PS21060200161.jpg',
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

    return res(ctx.status(201), ctx.json({ data }));
  }),

  // 답글 추가
  rest.post('/comments/:commentId/replies', async (req, res, ctx) => {
    const data = replies;
    const params = req.params;
    const id = params.commentId;
    const newData = await req.json();
    console.log('params', params);
    console.log('newData', newData);
    data.push({
      commentId: Number(id),
      replyId: Math.random(),
      memberName: 'RP',
      memberImage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT05FKRbwYdbvIz_7q6yf_3Oevdk6NIoPIFrA&usqp=CAU',
      createdAt: String(new Date()),
      modifiedAt: '',
      isModified: false,
      thumbupCount: 14,
      thumbDownCount: 12,
      isThumbup: true,
      isThumbDown: false,
      content: newData.content,
    });

    return res(ctx.status(201), ctx.json({ data }));
  }),

  // 신고 추가
  rest.post('/reports', async (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ res: 'report created!!' }));
  }),
  //--------------------------- PATCH --------------------------------

  // 댓글 수정
  rest.patch('/comments/:commentId', async (req, res, ctx) => {
    const data = comments;
    const params = req.params;

    const commentId = params.commentId;
    const newData = await req.json();

    const result = data.map((post) => {
      if (
        post.postId === Number(newData.postId) &&
        post.commentId === Number(commentId)
      ) {
        post.content = newData.content;
      }
      return post;
    });
    console.log('newData', newData);
    console.log('data', data);
    console.log('reqBody', req.body);
    console.log('result', result);

    return res(ctx.status(200), ctx.json(result));
  }),

  // 답글 수정
  rest.patch('/replies/:replies', async (req, res, ctx) => {
    const data = replies;
    const newData = await req.json();

    const result = data.map((reply) => {
      console.log('abc', reply);
      if (reply.replyId === Number(newData.replyId)) {
        reply.content = newData.content;
      }
      return reply;
    });
    console.log('newData', newData);
    console.log('data', data);
    console.log('reqBody', req.body);
    console.log('result', result);

    return res(ctx.status(200), ctx.json(result));
  }),
  //--------------------------- DELETE --------------------------------

  // 게시글 삭제
  rest.delete('/posts/:postId', async (req, res, ctx) => {
    // 삭제는 구현 불필요
    return res(ctx.status(200), ctx.json({ res: 'Delete Complete' }));
  }),

  // 댓글 삭제
  rest.delete('/comments/:commentId', async (req, res, ctx) => {
    // 삭제는 구현 불필요
    return res(ctx.status(200), ctx.json({ res: 'Delete Complete' }));
  }),

  // 답글 삭제
  rest.delete('/replies/:replyId', async (req, res, ctx) => {
    // 삭제는 구현 불필요
    return res(ctx.status(200), ctx.json({ res: 'Delete Complete' }));
  }),
];
