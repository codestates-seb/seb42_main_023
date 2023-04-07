const questionData = [
  {
    id: 0,
    question: '고객님은 만 19세 이상 34세 이하의 청년이십니까?',
    subinfo: '청년 맞춤형 공공전세대출 상품은 나이제한이 있습니다.',
    answers: [
      { id: 0, content: '네, 맞습니다.', next: 1 },
      { id: 1, content: '아니요.', next: 5 },
    ],
  },
  {
    id: 1,
    question: '고객님의 순자산은 3.61억원 이하이십니까?',
    answers: [
      { id: 1, content: '네, 맞습니다.', next: 2 },
      { id: 2, content: '아니요.', result: '상품:시중은행상품' },
    ],
  },
  {
    id: 2,
    question: '고객님은 중소기업에 재직중이십니까?',
    answers: [
      {
        id: 3,
        content: '네, 맞습니다.',
        result: '한도:1억, 금리:1.2%, 상품:중기청전월세보증금대출',
      },
      { id: 4, content: '아니요.', next: 3 },
    ],
  },
  {
    id: 3,
    question: '고객님의 대상주택 보증금은 얼마입니까?',
    answers: [
      {
        id: 5,
        content: '5000만원 이하',
        result: '한도:3500만원, 금리:1.3%, 상품:청년보증부월세대출',
      },
      { id: 6, content: '3억 이하', next: 4 },
    ],
  },
  {
    id: 4,
    question: '상여금을 포함한 연소득을 알려주세요.',
    answers: [
      {
        id: 7,
        content: '2천 이하',
        result: '한도:2억, 금리:1.5%, 상품:청년버팀목전세대출',
      },
      {
        id: 8,
        content: '4천 이하',
        result: '한도:2억, 금리:1.8%, 상품:청년버팀목전세대출',
      },
      {
        id: 9,
        content: '6천 이하',
        result: '한도:2억, 금리:2.1%, 상품:청년버팀목전세대출',
      },
    ],
  },
  {
    id: 5,
    question: '상여금을 포함한 연소득을 알려주세요.',
    answers: [
      { id: 10, content: '2천 이하', next: 6 },
      { id: 11, content: '4천 이하', next: 7 },
      { id: 12, content: '6천 이하', next: 8 },
    ],
  },
  {
    id: 6,
    question: '고객님의 대상주택 보증금은 얼마입니까?',
    answers: [
      {
        id: 13,
        content: '5천 이하',
        result: '한도:1.2억, 금리:1.8%, 상품:버팀목전세대출',
      },
      {
        id: 14,
        content: '1억 이하',
        result: '한도:1.2억, 금리:1.9%, 상품:버팀목전세대출',
      },
      {
        id: 15,
        content: '1억 초과',
        result: '한도:1.2억, 금리:2.0%, 상품:버팀목전세대출',
      },
    ],
  },
  {
    id: 7,
    question: '고객님의 대상주택 보증금은 얼마입니까?',
    answers: [
      {
        id: 16,
        content: '5천 이하',
        result: '한도:1.2억, 금리:2.0%, 상품:버팀목전세대출',
      },
      {
        id: 17,
        content: '1억 이하',
        result: '한도:1.2억, 금리:2.1%, 상품:버팀목전세대출',
      },
      {
        id: 18,
        content: '1억 초과',
        result: '한도:1.2억, 금리:2.2%, 상품:버팀목전세대출',
      },
    ],
  },
  {
    id: 8,
    question: '고객님의 대상주택 보증금은 얼마입니까?',
    answers: [
      {
        id: 19,
        content: '5천 이하',
        result: '한도:1.2억, 금리:2.2%, 상품:버팀목전세대출',
      },
      {
        id: 20,
        content: '1억 이하',
        result: '한도:1.2억, 금리:2.3%, 상품:버팀목전세대출',
      },
      {
        id: 21,
        content: '1억 초과',
        result: '한도:1.2억, 금리:2.4%, 상품:버팀목전세대출',
      },
    ],
  },
];

const resultData = [
  {
    id: '한도:1억, 금리:1.2%, 상품:중기청전월세보증금대출',
    content:
      '고객님께 한도 1억, 금리 1.2%의 중소기업취업청년 전월세보증금 대출을 추천 드립니다.',
    link: 'https://nhuf.molit.go.kr/FP/FP05/FP0502/FP05020601.jsp',
  },
  {
    id: '한도:3500만원, 금리:1.3%, 상품:청년보증부월세대출',
    content:
      '고객님께 한도 3500만원, 금리 1.3%의 청년전용 보증부월세대출을 추천 드립니다.',
    link: 'https://nhuf.molit.go.kr/FP/FP05/FP0502/FP05020701.jsp',
  },
  {
    id: '한도:2억, 금리:1.5%, 상품:청년버팀목전세대출',
    content:
      '고객님께 한도 2억, 금리 1.5%의 청년전용 버팀목전세자금을 추천 드립니다.',
    link: 'https://nhuf.molit.go.kr/FP/FP05/FP0502/FP05020301.jsp',
  },
  {
    id: '한도:2억, 금리:1.8%, 상품:청년버팀목전세대출',
    content:
      '고객님께 한도 2억, 금리 1.8%의 청년버팀목전세대출을 추천 드립니다.',
    link: 'https://nhuf.molit.go.kr/FP/FP05/FP0502/FP05020301.jsp',
  },
  {
    id: '한도:2억, 금리:2.1%, 상품:청년버팀목전세대출',
    content:
      '고객님께 한도 2억, 금리 2.1%의 청년버팀목전세대출을 추천 드립니다.',
    link: 'https://nhuf.molit.go.kr/FP/FP05/FP0502/FP05020301.jsp',
  },
  {
    id: '상품:시중은행상품',
    content: '시중의 청년 전용 대출상품을 추천드립니다.',
    subinfo: '소득기준에 부합하지 않아 공공대출상품을 이용할 수 없습니다.',
    link: 'https://new-m.pay.naver.com/loan/credit?from=cn0005',
  },
  {
    id: '한도:1.2억, 금리:1.8%, 상품:버팀목전세대출',
    content: '고객님께 한도 1.2억, 금리 1.8%의 버팀목전세대출을 추천 드립니다.',
    link: 'https://nhuf.molit.go.kr/FP/FP05/FP0502/FP05020101.jsp',
  },
  {
    id: '한도:1.2억, 금리:1.9%, 상품:버팀목전세대출',
    content: '고객님께 한도 1.2억, 금리 1.9%의 버팀목전세대출을 추천 드립니다.',
    link: 'https://nhuf.molit.go.kr/FP/FP05/FP0502/FP05020101.jsp',
  },
  {
    id: '한도:1.2억, 금리:2.0%, 상품:버팀목전세대출',
    content: '고객님께 한도 1.2억, 금리 2.0%의 버팀목전세대출을 추천 드립니다.',
    link: 'https://nhuf.molit.go.kr/FP/FP05/FP0502/FP05020101.jsp',
  },
  {
    id: '한도:1.2억, 금리:2.1%, 상품:버팀목전세대출',
    content: '고객님께 한도 1.2억, 금리 2.1%의 버팀목전세대출을 추천 드립니다.',
    link: 'https://nhuf.molit.go.kr/FP/FP05/FP0502/FP05020101.jsp',
  },
  {
    id: '한도:1.2억, 금리:2.2%, 상품:버팀목전세대출',
    content: '고객님께 한도 1.2억, 금리 2.2%의 버팀목전세대출을 추천 드립니다.',
    link: 'https://nhuf.molit.go.kr/FP/FP05/FP0502/FP05020101.jsp',
  },
  {
    id: '한도:1.2억, 금리:2.3%, 상품:버팀목전세대출',
    content: '고객님께 한도 1.2억, 금리 2.3%의 버팀목전세대출을 추천 드립니다.',
    link: 'https://nhuf.molit.go.kr/FP/FP05/FP0502/FP05020101.jsp',
  },
  {
    id: '한도:1.2억, 금리:2.4%, 상품:버팀목전세대출',
    content: '고객님께 한도 1.2억, 금리 2.4%의 버팀목전세대출을 추천 드립니다.',
    link: 'https://nhuf.molit.go.kr/FP/FP05/FP0502/FP05020101.jsp',
  },
];

export { questionData, resultData };
