import React from 'react';
import styled from 'styled-components';
import { WhiteBtn, BlueBtn } from '../common/Btn';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useGetReportReviewQuery } from '../../api/reportApi';

interface Props {
  setIsReviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReportReview: React.FC<Props> = ({ setIsReviewOpen }) => {
  // tools
  const { selectedReport } = useAppSelector(({ report }) => report);
  const { data, isSuccess } = useGetReportReviewQuery(selectedReport);

  // '자세히 보기' 버튼을 누르면 해당 페이지로 이동한다.
  // TODO: 배포 후 프론트주소로 바꾸기
  const seeDetailHandler = () => {
    window.open(`http://localhost:3000/posts/${data.postId}`);
  };

  return (
    <ModalBackdrop onClick={() => setIsReviewOpen(false)}>
      <ReportContainer onClick={(event) => event.stopPropagation()}>
        {isSuccess && (
          <>
            <h1>신고내용</h1>
            <Table>
              <tbody>
                <tr>
                  <th>신고번호</th>
                  <td>{data.reportId}</td>
                </tr>
                <tr className="row-even">
                  <th>신고시간</th>
                  <td>{data.reportedAt.replace('T', ' ').slice(0, -7)}</td>
                </tr>
                <tr>
                  <th>신고유형</th>
                  <td>{data.reportCategory}</td>
                </tr>
                <tr className="row-even">
                  <th>신고대상</th>
                  <td>{data.targetType}</td>
                </tr>
                <tr>
                  <th>작성자</th>
                  <td>{data.writer}</td>
                </tr>
                <tr className="row-even">
                  <th>신고자</th>
                  <td>{data.reporter}</td>
                </tr>
                <tr>
                  <th>사유</th>
                  <td>{data.description}</td>
                </tr>
              </tbody>
            </Table>
            <div className="button-container">
              <CheckedBtn onClick={() => setIsReviewOpen(false)}>
                확인
              </CheckedBtn>
              <SeeDetailBtn onClick={seeDetailHandler}>
                자세히 보기
              </SeeDetailBtn>
            </div>
          </>
        )}
      </ReportContainer>
    </ModalBackdrop>
  );
};

export default ReportReview;

// Modal이 떴을 때의 배경을 깔아주는 CSS
export const ModalBackdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const ReportContainer = styled.div`
  position: fixed;
  top: 30%;
  background-color: rgb(255, 255, 255);
  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: black;

  width: 450px;
  height: 500px;
  padding: 20px;

  border: 1px solid #d4d4d4;

  > h1 {
    font-size: 20px;
  }
  > .button-container {
    display: flex;
    justify-content: center;
  }
`;

const Table = styled.table`
  width: 100%;
  height: max-content;
  margin: 20px 0px;
  border-top: 1px solid #d4d4d4;
  border-bottom: 1px solid #d4d4d4;
  > tbody > tr {
    height: 40px;
    &.row-even {
      background-color: #f8f8f8;
    }
    > th {
      font-weight: 600;
      width: 90px;
    }
  }
`;

const CheckedBtn = styled(WhiteBtn)`
  width: 170px;
  height: 40px;
  font-weight: 700;
  margin-right: 8px;
`;

const SeeDetailBtn = styled(BlueBtn)`
  width: 170px;
  height: 40px;
  background-color: #102940;
  font-weight: 700;
  &:hover {
    background-color: #203b53;
  }
`;
