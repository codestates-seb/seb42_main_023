import React, { useState } from 'react';
import styled from 'styled-components';
import ReportReview from './ReportReview';
import { WhiteBtn } from '../common/Btn';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  setIsReviewOpen,
  setOrderby,
  setSelectedReport,
} from '../../slices/reportSlice';
import { useDeleteReportMutation } from '../../api/reportApi';
// import { useGetReportsStandByQuery } from '../../api/reportApi';
import { Report } from '../../types/Report';
// import Pagination from '../components/common/Pagination';

interface Props {
  reportData: Report;
  standby: boolean;
}

const ReportList: React.FC<Props> = ({ reportData, standby }) => {
  // tools
  const dispatch = useAppDispatch();
  const { isReviewOpen } = useAppSelector(({ report }) => report);
  const [deleteReport] = useDeleteReportMutation();

  // Pagination pageOffset
  const [pageOffset, setPageOffset] = useState(0);

  // List report that qualifies 'orderby'
  // const { data: reportData, isSuccess } = useGetReportsStandByQuery({
  //   page,
  //   orderby,
  // });

  // console.log('data', reportData);

  // 신고 대상 필터링
  const changeSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    dispatch(setOrderby(event.target.value));
  };

  const reviewReportHanlder = (reportId: number): void => {
    dispatch(setIsReviewOpen(true));
    dispatch(setSelectedReport(reportId));
  };

  const deleteReportHanlder = (reportId: number): void => {
    deleteReport(reportId)
      .unwrap()
      .then((res) => console.log('res in delete report:', res))
      .then((err) => console.log('err in delete report:', err));
  };

  return (
    <ReportMain>
      <SearchReport>
        <h1>미처리 신고글</h1>
        <TargetFilter>
          <label htmlFor="report-target">신고대상</label>
          <select id="report-target" onChange={changeSelectHandler}>
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
            {standby ? (
              <>
                <th>검토</th>
                <th>삭제</th>
              </>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {reportData?.reports?.map((item, idx) => {
            return (
              <tr
                key={item.reportId}
                className={idx % 2 === 0 ? 'row-even' : 'row-odd'}
              >
                <td className="target-type">{item.targetType}</td>
                <td className="report-category">{item.reportCategory}</td>
                <td className="description">{item.description.slice(0, 20)}</td>
                <td className="writer">{item.writer}</td>
                <td className="reported-time">
                  {item.reportedAt.replace('T', ' ').slice(0, -7)}
                </td>
                {standby ? (
                  <React.Fragment>
                    <td>
                      <HandleBtn
                        onClick={() => reviewReportHanlder(item.reportId)}
                      >
                        검토하기
                      </HandleBtn>
                    </td>
                    <td>
                      <HandleBtn
                        onClick={() => deleteReportHanlder(item.reportId)}
                      >
                        삭제하기
                      </HandleBtn>
                    </td>
                  </React.Fragment>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </Table>
      {isReviewOpen ? <ReportReview /> : null}
      {/* <Pagination
        pageInfo={reportData.pageInfo}
        pageOffset={pageOffset}
        setPageOffset={setPageOffset}
      /> */}
    </ReportMain>
  );
};

export default ReportList;

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
    &:focus {
      outline: none;
    }
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
