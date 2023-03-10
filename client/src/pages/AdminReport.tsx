import React from 'react';
import styled from 'styled-components';

const AdminReport: React.FC = () => {
  return (
    <AdminReportMain>
      <SearchReport>
        <h1>신고내역관리</h1>
        <div>
          <SearchSelect>
            <label htmlFor="report-target">신고대상</label>
            <select name="report-target">
              <option selected>전체</option>
              <option value="post">게시글</option>
              <option value="comment">댓글</option>
              <option value="reply">답글</option>
            </select>
          </SearchSelect>
          <SearchSelect>
            <label htmlFor="report-status">처리상태</label>
            <select name="report-status">
              <option selected>전체</option>
              <option value="done">처리</option>
              <option value="todo">미처리</option>
            </select>
          </SearchSelect>
          <SearchBtn>검색</SearchBtn>
        </div>
      </SearchReport>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>신고시간</th>
            <th>신고유형</th>
            <th>신고대상</th>
            <th>처리상태</th>
            <th>처리시간</th>
          </tr>
        </thead>
        <tbody>
          {reportData.reports.map((item, idx) => {
            return (
              <TableRow
                key={item.reportId}
                className={idx % 2 === 0 ? 'row-even' : 'row-odd'}
              >
                <td>{idx + 1}</td>
                <td>{item.reportedAT.replace('T', ' ').slice(0, -4)}</td>
                <td>{item.reportReason}</td>
                <td>
                  {item.postId ? '게시글' : null}
                  {item.commentId ? '댓글' : null}
                  {item.replyId ? '답글' : null}
                </td>
                <td>{item.handleState}</td>
                <td>{item.handledAt.replace('T', ' ').slice(0, -4)}</td>
              </TableRow>
            );
          })}
        </tbody>
      </table>
    </AdminReportMain>
  );
};

export default AdminReport;

// AdminReport 페이지의 main
const AdminReportMain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

// 신고내역 검색
const SearchReport = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 180px;
  > h1 {
    font-size: 20px;
    margin-bottom: 24px;
  }
  > div {
    display: flex;
    align-items: center;
  }
`;

// 신고내역 필터링과 검색 버튼을 감싸는 컨테이너
const SearchSelect = styled.div`
  display: flex;
  flex-direction: column;
  > select {
    border: 1px solid #d4d4d4;
    width: 283px;
    height: 35px;
    border-radius: 3px;
    margin: 5px 14px 0px 0px;
  }
`;

//! 버튼 컴포넌트 가져오면 지우기
const SearchBtn = styled.button`
  width: 80px;
  height: 35px;
  margin-top: 20px;
  background-color: #deeffc;
  color: #0069ca;
  font-weight: 700;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

// 테이블 바디. 짝수idx에만 배경색 적용
const TableRow = styled.tr`
  text-align: center;
  height: 30px;
  &.row-even {
    background-color: #f8f8f8;
  }
`;

// dummyData
const reportData = {
  pageInfo: {
    page: 1,
    size: 5,
    totalElement: 123,
    totalPage: 13,
  },
  reports: [
    {
      reportId: 1,
      reportReason: '양리목적/홍보성',
      description: '홍보가 너무 심해요!',
      target: '2019-11-12T16:34:30.388',
      postId: 123123,
      commentId: null,
      replyId: null,
      reporterName: '나는야 프로신고러',
      reportedAT: '2019-11-12T16:34:30.388',
      handleState: '처리',
      handledAt: '2019-11-12T16:34:30.388',
    },
    {
      reportId: 2,
      reportReason: '불쾌감을 주는 내용',
      description: '너무 불쾌한 내용입니다..',
      target: '2019-11-12T16:34:30.388',
      postId: null,
      commentId: 2,
      replyId: null,
      reporterName: '헬로우',
      reportedAT: '2019-11-12T16:34:30.388',
      handleState: '처리',
      handledAt: '2019-11-12T16:34:30.388',
    },
    {
      reportId: 3,
      reportReason: '기타',
      description:
        '이 게시글은 너무도 많은 문제가 있습니다.... 첫번째로는...이런 이유이고.... 두번째는.... 이런 이유입니다.',
      target: '2019-11-12T16:34:30.388',
      postId: null,
      commentId: null,
      replyId: 1,
      reporterName: '나는 신고자',
      reportedAT: '2019-11-12T16:34:30.388',
      handleState: '미처리',
      handledAt: '2019-11-12T16:34:30.388',
    },
  ],
};
