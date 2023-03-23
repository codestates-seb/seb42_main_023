//TODO 데이터 정의
// 상세 페이지
export const postDetail = [
  {
    postId: 1,
    memberName: 'GoodBoy',
    memberImage:
      'https://img.khan.co.kr/news/2020/10/16/2020101601001687000138341.jpg',
    createdAt: '2023-03-12T16:34:30.388',
    modifiedAt: '2023-03-13T16:34:30.388',
    isModified: true,
    viewCount: 254,
    thumbupCount: 5,
    thumbDownCount: 3,
    title: '화성 갈끄니까~~',
    content:
      '썸네일에서도 나와 있듯이, 화성 갈끄니까라는 밈은 테슬라의 CEO 일론 머스크와 관계가 있습니다. 2020년도부터 비트코인 열풍이 불기 시작했고, 비트코인에 대해 큰 관심을 보이는 일론 머스크도 크게 주목을 받았죠. 실제로 일론 머스크가 트위터에 한 마디 할 때마다 코인 가격이 오르내리는 기이한 현상도 자주 벌어졌죠.게다가 테슬라의 주가가 미친듯이 오르고 있었기에 더욱이 일론 머스크가 국내에서 유명해졌습니다. 일론 머스크라는 CEO가 유명해지자 그가 하고 있는 사업들도 크게 주목을 받았고, 그의 화성 진출 프로젝트는 사람들을 신선한 충격에 휩싸이게 했죠.   그런 상황에서 나몰라패밀리 핫쇼라는 유튜브 채널에서 일론 머스크가 한국어 하는 유머 영상을 올리기 시작했습니다. 해당 영상의 마지막에 테슬라 주식 많이 사세요. 화성 갈끄니까~~~라는 말이 너무 찰져서 사람들 사이에서 큰 인기를 끌기 시작한 것입니다',
    isBookmarked: true,
    isThumbup: true,
    isThumbDown: false,
  },
  {
    postId: 2,
    memberName: 'Dragon',
    memberImage:
      'https://image.newsis.com/2022/10/31/NISI20221031_0001117996_web.jpg',
    createdAt: '2023-03-12T16:34:30.388',
    modifiedAt: '2023-03-13T16:34:30.388',
    isModified: true,
    viewCount: 254,
    thumbupCount: 5,
    thumbDownCount: 3,
    title: '부동산으로 부자 되는 법',
    content:
      '책을 많이 읽고  이사람 저사람 많이 만나서 지식을 쌓으세요. 아는게 많고 주변에 사람이 많아야 되요 사람이 많다는게   이사람 저사람 만나다보면  이시람은 내가 필료한사람이다 필료없는사람이다 다 나눠져요  책을 많이 읽다보면  지식이 쌓아서   다른분들도 이사람은 괜찮은사람이다  다른사람한테도 소개도 해줘요  그렇다보면 차근차근 돈이 모여요 뭐 투자다 뭐다 이거 투자해라 좋은거다  이런거는 하지마시고요',
    isBookmarked: true,
    isThumbup: true,
    isThumbDown: false,
  },
];
// 댓글
export const comments = [
  {
    postId: 1,
    commentId: 1,
    memberName: 'CP1',
    memberImage:
      'https://images.chosun.com/resizer/C6ad4fbBBVwyUdn6ziRBR_VEkL8=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/2R24FEZO6VFKNHJKND4FGETXVY.JPG',
    createdAt: '2023-03-16T16:34:30.388',
    modifiedAt: '',
    isModified: false,
    replyCount: 2,
    thumbupCount: 14,
    thumbDownCount: 12,
    isThumbup: true,
    isThumbDown: false,
    content: '1등!! 첫번째 댓글 입니다요.',
  },
  {
    postId: 1,
    commentId: 2,
    memberName: 'CP2',
    memberImage:
      'https://dimg.donga.com/wps/NEWS/IMAGE/2021/08/29/108813367.4.jpg',
    createdAt: '2023-03-15T16:34:30.388',
    modifiedAt: '2023-03-16T16:34:30.388',
    isModified: true,
    replyCount: 1,
    thumbupCount: 14,
    thumbDownCount: 12,
    isThumbup: true,
    isThumbDown: false,
    content: '2등 !! 두번째 댓글 입니다요.',
  },
  {
    postId: 2,
    commentId: 1,
    memberName: 'CP1',
    memberImage:
      'https://images.chosun.com/resizer/C6ad4fbBBVwyUdn6ziRBR_VEkL8=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/2R24FEZO6VFKNHJKND4FGETXVY.JPG',
    createdAt: '2023-03-16T16:34:30.388',
    modifiedAt: '',
    isModified: false,
    replyCount: 2,
    thumbupCount: 2,
    thumbDownCount: 2,
    isThumbup: true,
    isThumbDown: false,
    content: ' 두번 째 글도 1등!!',
  },
];

// 답글
export const replies = [
  {
    commentId: 1,
    replyId: 1,
    memberName: 'RP',
    memberImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT05FKRbwYdbvIz_7q6yf_3Oevdk6NIoPIFrA&usqp=CAU',
    createdAt: '2023-03-16T16:34:30.388',
    modifiedAt: '2023-03-18T16:34:30.388',
    isModified: false,
    thumbupCount: 14,
    thumbDownCount: 12,
    isThumbup: true,
    isThumbDown: false,
    content:
      '꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.꿀팁 감사합니다.',
  },
  {
    commentId: 1,
    replyId: 2,
    memberName: 'RP',
    memberImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT05FKRbwYdbvIz_7q6yf_3Oevdk6NIoPIFrA&usqp=CAU',
    createdAt: '2023-03-16T16:34:30.388',
    modifiedAt: '',
    isModified: false,
    thumbupCount: 14,
    thumbDownCount: 12,
    isThumbup: true,
    isThumbDown: false,
    content: '추천 박고 갑니다.',
  },
  {
    commentId: 2,
    replyId: 3,
    memberName: 'RP',
    memberImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT05FKRbwYdbvIz_7q6yf_3Oevdk6NIoPIFrA&usqp=CAU',
    createdAt: '2023-03-16T16:34:30.388',
    modifiedAt: '',
    isModified: false,
    replyCount: 1,
    thumbupCount: 14,
    thumbDownCount: 12,
    isThumbup: true,
    isThumbDown: false,
    content: '유익한글 감사합니다',
  },
];

// 추천 게시물
export const recomendedPosts = [
  {
    postId: 1,
    title: '게시글 1 입니다.',
    tags: [
      {
        tagId: 123123,
        tagName: 'Java',
      },
      {
        tagId: 456456,
        tagName: 'Python',
      },
    ],
    memberName: '작성자닉네임',
    createdAt: '2019-11-12T16:34:30.388',
    viewCount: 123123,
    thumbupCount: 123123,
  },
  {
    postId: 2,
    title: '게시글 2 입니다.',
    tags: [
      {
        tagId: 123123,
        tagName: 'Java',
      },
      {
        tagId: 456456,
        tagName: 'Python',
      },
    ],
    memberName: '작성자닉네임',
    createdAt: '2019-11-12T16:34:30.388',
    viewCount: 123123,
    thumbupCount: 123123,
  },
  {
    postId: 3,
    title: '게시글 3 입니다.',
    tags: [
      {
        tagId: 123123,
        tagName: 'Java',
      },
      {
        tagId: 456456,
        tagName: 'Python',
      },
    ],
    memberName: '작성자닉네임',
    createdAt: '2019-11-12T16:34:30.388',
    viewCount: 123123,
    thumbupCount: 123123,
  },
  {
    postId: 4,
    title: '게시글 4 입니다.',
    tags: [
      {
        tagId: 123123,
        tagName: 'Java',
      },
      {
        tagId: 456456,
        tagName: 'Python',
      },
    ],
    memberName: '작성자닉네임',
    createdAt: '2019-11-12T16:34:30.388',
    viewCount: 123123,
    thumbupCount: 123123,
  },
  {
    postId: 5,
    title: '게시글 5 입니다.',
    tags: [
      {
        tagId: 123123,
        tagName: 'Java',
      },
      {
        tagId: 456456,
        tagName: 'Python',
      },
    ],
    memberName: '작성자닉네임',
    createdAt: '2019-11-12T16:34:30.388',
    viewCount: 123123,
    thumbupCount: 123123,
  },
  {
    postId: 6,
    title: '게시글 6 입니다.',
    tags: [
      {
        tagId: 123123,
        tagName: 'Java',
      },
      {
        tagId: 456456,
        tagName: 'Python',
      },
    ],
    memberName: '작성자닉네임',
    createdAt: '2019-11-12T16:34:30.388',
    viewCount: 123123,
    thumbupCount: 123123,
  },
  {
    postId: 7,
    title: '게시글 7 입니다.',
    tags: [
      {
        tagId: 123123,
        tagName: 'Java',
      },
      {
        tagId: 456456,
        tagName: 'Python',
      },
    ],
    memberName: '작성자닉네임',
    createdAt: '2019-11-12T16:34:30.388',
    viewCount: 123123,
    thumbupCount: 123123,
  },
  {
    postId: 8,
    title: '게시글 8 입니다.',
    tags: [
      {
        tagId: 123123,
        tagName: 'Java',
      },
      {
        tagId: 456456,
        tagName: 'Python',
      },
    ],
    memberName: '작성자닉네임',
    createdAt: '2019-11-12T16:34:30.388',
    viewCount: 123123,
    thumbupCount: 123123,
  },
  {
    postId: 9,
    title: '게시글 9 입니다.',
    tags: [
      {
        tagId: 123123,
        tagName: 'Java',
      },
      {
        tagId: 456456,
        tagName: 'Python',
      },
    ],
    memberName: '작성자닉네임',
    createdAt: '2019-11-12T16:34:30.388',
    viewCount: 123123,
    thumbupCount: 123123,
  },
  {
    postId: 10,
    title: '게시글 10 입니다.',
    tags: [
      {
        tagId: 123123,
        tagName: 'Java',
      },
      {
        tagId: 456456,
        tagName: 'Python',
      },
    ],
    memberName: '작성자닉네임',
    createdAt: '2019-11-12T16:34:30.388',
    viewCount: 123123,
    thumbupCount: 123123,
  },
];
