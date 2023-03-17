const questionData = [
  {
    id: 0,
    question: '고객님은 만 19세 이상 34세 이하의 청년이십니까?',
    answers: [
      { content: '예', next: 1 },
      { content: '아니요', next: 5 },
    ],
  },
  {
    id: 1,
    question: '고객님의 순자산은 3.61억원 이하이십니까?',
    answers: [
      { content: '예', next: 2 },
      { content: '아니요', next: '상품:시중은행상품' },
    ],
  },
  {
    id: 2,
    question: '고객님의 중소기업에 재직중이십니까?',
    answers: [
      {
        content: '예',
        next: '한도:1억, 금리:1.2%, 상품:중기청전월세보증금대출',
      },
      { content: '아니요', next: 3 },
    ],
  },
  {
    id: 3,
    question: '고객님의 대상주택 보증금은 얼마입니까?',
    answers: [
      {
        content: '5000만원 이하',
        next: '한도:3500만원, 금리:1.3%, 상품:청년보증부월세대출',
      },
      { content: '3억 이하', next: 4 },
    ],
  },
  {
    id: 4,
    question: '상여금을 포함한 연소득을 알려주세요.',
    answers: [
      {
        content: '2천 이하',
        next: '한도:2억, 금리:1.5%, 상품:청년버팀목전세대출',
      },
      {
        content: '4천 이하',
        next: '한도:2억, 금리:1.8%, 상품:청년버팀목전세대출',
      },
      {
        content: '6천 이하',
        next: '한도:2억, 금리:2.1%, 상품:청년버팀목전세대출',
      },
    ],
  },
  {
    id: 5,
    question: '상여금을 포함한 연소득을 알려주세요.',
    answers: [
      { content: '2천 이하', next: 6 },
      { content: '4천 이하', next: 7 },
      { content: '6천 이하', next: 8 },
    ],
  },
  {
    id: 6,
    question: '고객님의 대상주택 보증금은 얼마입니까?',
    answers: [
      { content: '5천 이하', next: null, resultId: 6 },
      { content: '1억 이하', next: null, resultId: 7 },
      { content: '1억 초과', next: null, resultId: 8 },
    ],
  },
  {
    id: 7,
    question: '고객님의 대상주택 보증금은 얼마입니까?',
    answers: [
      { content: '5천 이하', next: null, resultId: 8 },
      { content: '1억 이하', next: null, resultId: 9 },
      { content: '1억 초과', next: null, resultId: 10 },
    ],
  },
  {
    id: 8,
    question: '고객님의 대상주택 보증금은 얼마입니까?',
    answers: [
      { content: '5천 이하', next: null, resultId: 10 },
      { content: '1억 이하', next: null, resultId: 11 },
      { content: '1억 초과', next: null, resultId: 12 },
    ],
  },
];

const resultData = [
  {
    id: '한도:1억, 금리:1.2%, 상품:중기청전월세보증금대출',
    content:
      '고객님께 한도 1억, 금리 1.2%의 중기청전월세보증금대출을 추천 드립니다.',
  },
  {
    id: '한도:3500만원, 금리:1.3%, 상품:청년보증부월세대출',
    content:
      '고객님께 한도 3500만원, 금리 1.3%의 청년보증부월세대출을 추천 드립니다.',
  },
  {
    id: '한도:2억, 금리:1.5%, 상품:청년버팀목전세대출',
    content:
      '고객님께 한도 2억, 금리 1.5%의 청년버팀목전세대출을 추천 드립니다.',
  },
  {
    id: '한도:2억, 금리:1.8%, 상품:청년버팀목전세대출',
    content:
      '고객님께 한도 2억, 금리 1.8%의 청년버팀목전세대출을 추천 드립니다.',
  },
  {
    id: '한도:2억, 금리:2.1%, 상품:청년버팀목전세대출',
    content:
      '고객님께 한도 2억, 금리 2.1%의 청년버팀목전세대출을 추천 드립니다.',
  },
  {
    id: '상품:시중은행상품',
    content: '시중은행 상품을 추천드립니다.',
  },
  {
    id: 6,
    content: '고객님께 한도 1.2억, 금리 1.8%의 버팀목전세대출을 추천 드립니다.',
  },
  {
    id: 7,
    content: '고객님께 한도 1.2억, 금리 1.9%의 버팀목전세대출을 추천 드립니다.',
  },
  {
    id: 8,
    content: '고객님께 한도 1.2억, 금리 2.0%의 버팀목전세대출을 추천 드립니다.',
  },
  {
    id: 9,
    content: '고객님께 한도 1.2억, 금리 2.1%의 버팀목전세대출을 추천 드립니다.',
  },
  {
    id: 10,
    content: '고객님께 한도 1.2억, 금리 2.2%의 버팀목전세대출을 추천 드립니다.',
  },
  {
    id: 11,
    content: '고객님께 한도 1.2억, 금리 2.3%의 버팀목전세대출을 추천 드립니다.',
  },
  {
    id: 12,
    content: '고객님께 한도 1.2억, 금리 2.4%의 버팀목전세대출을 추천 드립니다.',
  },
];

export { questionData, resultData };
