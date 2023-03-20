//전체 게시글 리스트
export const posts = {
  pageInfo: {
    page: 1,
    size: 10,
    totalElement: 123,
    totalPage: 13,
  },
  posts: [
    {
      postId: 1,
      title: '게시글제목',
      imgUrl: 'https://t1.daumcdn.net/cfile/tistory/22488F46581C01011D',
      tags: [
        {
          id: 1,
          tagName: 'Java',
        },
        {
          id: 2,
          tagName: 'Python',
        },
      ],
      memberName: 'bunny',
      createdAt: '2023-03-14T16:34:30.388',
      viewCount: 123,
      thumbupCount: 12,
    },
    {
      postId: 2,
      title: '게시글제목',
      imgUrl:
        'https://jmagazine.joins.com/_data/photo/2020/07/3698936108_rU5XvNEa_1.jpg',
      tags: [
        { id: 1, tagName: 'Java' },
        { id: 2, tagName: 'Python' },
      ],
      memberName: 'bunny',
      createdAt: '2019-11-12T16:34:30.388',
      viewCount: 12,
      thumbupCount: 123,
    },
  ],
};
//주간인기글 top3
export const weeklyPopular = {
  pageInfo: {
    page: 1,
    size: 10,
    totalElement: 123,
    totalPage: 13,
  },
  posts: [
    {
      postId: 1,
      title: '게시글제목',
      imgUrl:
        'https://jmagazine.joins.com/_data/photo/2020/07/3698936108_rU5XvNEa_1.jpg',
      tags: [
        {
          id: 1,
          tagName: 'Java',
        },
        {
          id: 2,
          tagName: 'Python',
        },
      ],
      memberName: 'bunny',
      createdAt: '2023-03-14T16:34:30.388',
      viewCount: 123,
      thumbupCount: 12,
    },
    {
      postId: 2,
      title: '게시글제목',
      imgUrl:
        'https://jmagazine.joins.com/_data/photo/2020/07/3698936108_rU5XvNEa_1.jpg',
      tags: [
        { id: 1, tagName: 'Java' },
        { id: 2, tagName: 'Python' },
      ],
      memberName: 'bunny',
      createdAt: '2019-11-12T16:34:30.388',
      viewCount: 12,
      thumbupCount: 123,
    },
    {
      postId: 3,
      title: '게시글제목',
      imgUrl:
        'https://jmagazine.joins.com/_data/photo/2020/07/3698936108_rU5XvNEa_1.jpg',
      tags: [
        { id: 1, tagName: 'Java' },
        { id: 2, tagName: 'Python' },
      ],
      memberName: 'bunny',
      createdAt: '2019-11-12T16:34:30.388',
      viewCount: 12,
      thumbupCount: 123,
    },
  ],
};
