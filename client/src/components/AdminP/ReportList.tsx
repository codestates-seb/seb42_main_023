import React, { useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import ReportReview from './ReportReview';
import { useAppDispatch } from '../../hooks';
import { setSelectedReport } from '../../slices/reportSlice';
import { useDeleteReportMutation } from '../../api/reportApi';
import { Report } from '../../types/Report';
import Pagination from '../common/Pagination';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

interface Props {
  reportData: Report;
  isSuccess: boolean;
  standby: boolean;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setOrderby: Dispatch<SetStateAction<string>>;
}

const ReportList: React.FC<Props> = ({
  reportData,
  isSuccess,
  standby,
  setCurrentPage,
  setOrderby,
}) => {
  // tools
  const dispatch = useAppDispatch();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [deleteReport] = useDeleteReportMutation();

  // Pagination pageOffset
  const [pageOffset, setPageOffset] = useState(0);

  const changeSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderby(event.target.value);
  };

  const reviewReportHanlder = (reportId: number): void => {
    setIsReviewOpen(true);
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
            <th>신고사유</th>
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
          {isSuccess && !reportData.reports ? (
            <div>
              <AiOutlineExclamationCircle size={20} />
              <p>접수된 신고건이 없습니다.</p>
            </div>
          ) : (
            reportData?.reports?.map((item, idx) => {
              return (
                <tr
                  key={item.reportId}
                  className={idx % 2 === 0 ? 'row-even' : 'row-odd'}
                >
                  <td className="target-type">{item.targetType}</td>
                  <td className="report-category">{item.reportCategory}</td>
                  <td className="description">{item.description}</td>
                  <td className="writer">{item.writer}</td>
                  <td className="reported-time">
                    {item.reportedAt.replace('T', ' ').slice(0, -7)}
                  </td>
                  {standby ? (
                    <React.Fragment>
                      <td className="review-btn">
                        <HandleBtn
                          onClick={() => reviewReportHanlder(item.reportId)}
                        >
                          검토하기
                        </HandleBtn>
                      </td>
                      <td className="delete-btn">
                        <DeleteBtn
                          onClick={() => deleteReportHanlder(item.reportId)}
                        >
                          삭제하기
                        </DeleteBtn>
                      </td>
                    </React.Fragment>
                  ) : null}
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
      {isReviewOpen ? <ReportReview setIsReviewOpen={setIsReviewOpen} /> : null}
      {isSuccess && (
        <Pagination
          pageInfo={reportData.pageInfo}
          pageOffset={pageOffset}
          setPageOffset={setPageOffset}
          setCurrentPage={setCurrentPage}
        />
      )}
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
  border-collapse: collapse;
  width: 100%;
  > thead > tr > th {
    font-size: 14px;
    font-weight: 600;
    height: 30px;
    border-bottom: 1px solid var(--border-color);
  }

  > tbody {
    // 접수된 신고가 없을때
    > div {
      display: flex;
      > p {
        margin-left: 3px;
      }
    }

    // 접수된 신고가 있을때
    > tr {
      text-align: center;
      height: 35px;
      border-bottom: 1px solid var(--border-color);
      &.row-even {
        background-color: #f8f8f8;
      }
      &:hover {
        background-color: #f3faff;
      }
      > td {
        font-size: 14px;
        &.target-type {
          width: 50px;
        }
        &.report-category {
          width: 95px;
        }
        &.description {
          text-align: left;
          padding-left: 20px;
        }
        &.writer {
          width: 90px;
        }
        &.reported-time {
          width: 150px;
        }
        &.review-btn,
        &.delete-btn {
          width: 60px;
        }
      }
    }
  }
`;

const HandleBtn = styled.button`
  font-size: 13px;
  padding: 3px;
  border-radius: 2px;
  background-color: rgba(0, 105, 202, 0.2);
`;

const DeleteBtn = styled(HandleBtn)`
  background-color: rgba(202, 0, 0, 0.2);
`;
