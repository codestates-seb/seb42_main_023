import React from 'react';
import NavAdmin from '../components/AdminP/NavAdmin';
import styled from 'styled-components';
import { WhiteBtn } from '../components/common/Btn';
// import Pagination from '../components/AdminP/Pagination';
import Report from '../components/AdminP/Report';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setIsReviewOpen, setSelectedReport } from '../slices/reportSlice';
import { useDeleteReportMutation } from '../api/reportApi';

const ReportsStandBy = () => {
  // tools
  const dispatch = useAppDispatch();
  const { isReviewOpen } = useAppSelector(({ report }) => report);
  const [deleteReport] = useDeleteReportMutation();
  // 신고 대상 서치
  // const [selectedOption, setSelectedOption] = useState('all');
  // const changeSelectHandler = (
  //   event: React.ChangeEvent<HTMLSelectElement>,
  // ): void => {
  //   setSelectedOption(event.target.value);
  // };

  const reviewReportHanlder = (reportId: number): void => {
    console.log('reportId:', reportId);
    dispatch(setIsReviewOpen(true));
    dispatch(setSelectedReport(reportId));
  };

  return (
    <AdminMain>
      <div>
        <NavAdmin />
        <ReportMain>
          <SearchReport>
            <h1>미처리 신고글</h1>
            <TargetFilter>
              <label htmlFor="report-target">신고대상</label>
              <select
                id="report-target"
                // defaultValue={selectedOption}
                // onChange={changeSelectHandler}
              >
                <option value="all">전체</option>
                <option value="post">게시글</option>
                <option value="comment">댓글</option>
                <option value="reply">답글</option>
              </select>
            </TargetFilter>
          </SearchReport>
          <Table>
            <thead>
              <tr>
                <th>신고대상</th>
                <th>신고유형</th>
                <th>제목/내용</th>
                <th>작성자</th>
                <th>신고시간</th>
                <th>검토</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {reportData.reports.map((item, idx) => {
                return (
                  <tr
                    key={item.reportId}
                    className={idx % 2 === 0 ? 'row-even' : 'row-odd'}
                  >
                    <td>{item.targetType}</td>
                    <td>{item.reportCategory}</td>
                    <td>{item.title}</td>
                    <td>{item.writer}</td>
                    <td>{item.reportedAT.replace('T', ' ').slice(0, -7)}</td>
                    <td>
                      <HandleBtn
                        onClick={() => reviewReportHanlder(item.reportId)}
                      >
                        검토하기
                      </HandleBtn>
                    </td>
                    <td>
                      <HandleBtn onClick={() => deleteReport(item.reportId)}>
                        삭제하기
                      </HandleBtn>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </ReportMain>
      </div>
      {isReviewOpen ? <Report /> : null}
      {/* <Pagination /> */}
    </AdminMain>
  );
};

export default ReportsStandBy;

// Admin 페이지의 main
const AdminMain = styled.div`
  > div {
    width: 100%;
    height: 100%;
    display: flex;
  }
`;

// Nav를 제외한 영역 컨테이너
const ReportMain = styled.div`
  padding: 0px 35px;
  width: calc(100% - 140px);
  > table {
    width: 100%;
  }
`;

// 신고대상 필터링 컨테이너
const SearchReport = styled.div`
  margin-bottom: 20px;
  > h1 {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

// 신고내역 필터링과 검색 버튼을 감싸는 컨테이너
const TargetFilter = styled.div`
  display: flex;
  flex-direction: column;
  > label {
    font-size: 14px;
  }
  > select {
    border: 1px solid #d4d4d4;
    width: 200px;
    height: 30px;
    border-radius: 3px;
    margin-top: 5px;
    font-size: 14px;
  }
`;

// 신고글 리스트
const Table = styled.table`
  > thead > tr > th {
    font-size: 14px;
    font-weight: 600;
  }

  > tbody > tr {
    text-align: center;
    height: 30px;
    &.row-even {
      background-color: #f8f8f8;
    }
    > td {
      font-size: 14px;
    }
  }
`;

const HandleBtn = styled(WhiteBtn)`
  font-size: 13px;
  padding: 3px;
`;

// dummyData: 한페이지당 14개
const reportData = {
  pageInfo: {
    page: 1,
    size: 14,
    totalElement: 123,
    totalPage: 13,
  },
  reports: [
    {
      reportId: 1,
      reportedAT: '2019-11-12T16:34:30.388',
      reportCategory: '양리목적/홍보성',
      targetType: '게시글',
      title: '광고. 이 보험 사세요!',
      writer: '작성자',
      reporter: '신고자',
      description: '보험 상품을 판매하는 글이여서 신고했습니다.',
      postId: 2,
      commentId: null,
      replyId: null,
    },
    {
      reportId: 2,
      reportedAT: '2019-11-12T16:34:30.388',
      reportCategory: '양리목적/홍보성',
      targetType: '댓글',
      title: '광고. 이 보험 사세요!',
      writer: '작성자',
      reporter: '신고자',
      description: '보험 상품을 판매하는 글이여서 신고했습니다.',
      postId: 2,
      commentId: null,
      replyId: null,
    },
    {
      reportId: 3,
      reportedAT: '2019-11-12T16:34:30.388',
      reportCategory: '양리목적/홍보성',
      targetType: '답글',
      title: '광고. 이 보험 사세요!',
      writer: '작성자',
      reporter: '신고자',
      description: '보험 상품을 판매하는 글이여서 신고했습니다.',
      postId: 2,
      commentId: null,
      replyId: null,
    },
    {
      reportId: 4,
      reportedAT: '2019-11-12T16:34:30.388',
      reportCategory: '양리목적/홍보성',
      targetType: '게시글',
      title: '광고. 이 보험 사세요!',
      writer: '작성자',
      reporter: '신고자',
      description: '보험 상품을 판매하는 글이여서 신고했습니다.',
      postId: 2,
      commentId: null,
      replyId: null,
    },
    {
      reportId: 5,
      reportedAT: '2019-11-12T16:34:30.388',
      reportCategory: '양리목적/홍보성',
      targetType: '게시글',
      title: '광고. 이 보험 사세요!',
      writer: '작성자',
      reporter: '신고자',
      description: '보험 상품을 판매하는 글이여서 신고했습니다.',
      postId: 2,
      commentId: null,
      replyId: null,
    },
    {
      reportId: 6,
      reportedAT: '2019-11-12T16:34:30.388',
      reportCategory: '양리목적/홍보성',
      targetType: '게시글',
      title: '광고. 이 보험 사세요!',
      writer: '작성자',
      reporter: '신고자',
      description: '보험 상품을 판매하는 글이여서 신고했습니다.',
      postId: 2,
      commentId: null,
      replyId: null,
    },
    {
      reportId: 7,
      reportedAT: '2019-11-12T16:34:30.388',
      reportCategory: '양리목적/홍보성',
      targetType: '게시글',
      title: '광고. 이 보험 사세요!',
      writer: '작성자',
      reporter: '신고자',
      description: '보험 상품을 판매하는 글이여서 신고했습니다.',
      postId: 2,
      commentId: null,
      replyId: null,
    },
    {
      reportId: 8,
      reportedAT: '2019-11-12T16:34:30.388',
      reportCategory: '양리목적/홍보성',
      targetType: '게시글',
      title: '광고. 이 보험 사세요!',
      writer: '작성자',
      reporter: '신고자',
      description: '보험 상품을 판매하는 글이여서 신고했습니다.',
      postId: 2,
      commentId: null,
      replyId: null,
    },
    {
      reportId: 9,
      reportedAT: '2019-11-12T16:34:30.388',
      reportCategory: '양리목적/홍보성',
      targetType: '게시글',
      title: '광고. 이 보험 사세요!',
      writer: '작성자',
      reporter: '신고자',
      description: '보험 상품을 판매하는 글이여서 신고했습니다.',
      postId: 2,
      commentId: null,
      replyId: null,
    },
    {
      reportId: 10,
      reportedAT: '2019-11-12T16:34:30.388',
      reportCategory: '양리목적/홍보성',
      targetType: '게시글',
      title: '광고. 이 보험 사세요!',
      writer: '작성자',
      reporter: '신고자',
      description: '보험 상품을 판매하는 글이여서 신고했습니다.',
      postId: 2,
      commentId: null,
      replyId: null,
    },
    {
      reportId: 11,
      reportedAT: '2019-11-12T16:34:30.388',
      reportCategory: '양리목적/홍보성',
      targetType: '게시글',
      title: '광고. 이 보험 사세요!',
      writer: '작성자',
      reporter: '신고자',
      description: '보험 상품을 판매하는 글이여서 신고했습니다.',
      postId: 2,
      commentId: null,
      replyId: null,
    },
    {
      reportId: 12,
      reportedAT: '2019-11-12T16:34:30.388',
      reportCategory: '양리목적/홍보성',
      targetType: '게시글',
      title: '광고. 이 보험 사세요!',
      writer: '작성자',
      reporter: '신고자',
      description: '보험 상품을 판매하는 글이여서 신고했습니다.',
      postId: 2,
      commentId: null,
      replyId: null,
    },
    {
      reportId: 13,
      reportedAT: '2019-11-12T16:34:30.388',
      reportCategory: '양리목적/홍보성',
      targetType: '게시글',
      title: '광고. 이 보험 사세요!',
      writer: '작성자',
      reporter: '신고자',
      description: '보험 상품을 판매하는 글이여서 신고했습니다.',
      postId: 2,
      commentId: null,
      replyId: null,
    },
    {
      reportId: 14,
      reportedAT: '2019-11-12T16:34:30.388',
      reportCategory: '양리목적/홍보성',
      targetType: '게시글',
      title: '광고. 이 보험 사세요!',
      writer: '작성자',
      reporter: '신고자',
      description: '보험 상품을 판매하는 글이여서 신고했습니다.',
      postId: 2,
      commentId: null,
      replyId: null,
    },
  ],
};
