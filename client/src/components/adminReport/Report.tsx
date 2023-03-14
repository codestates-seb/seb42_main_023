import React from 'react';

interface ReportProps {
  selectedReport: number | null;
}

const Report: React.FC<ReportProps> = ({ selectedReport }) => {
  console.log(selectedReport); // reportId

  return (
    <div>
      <h1>신고내용</h1>
      <table>
        <tr>
          <th>신고번호</th>
          <td>{singleReportData.reportId}</td>
        </tr>
        <tr>
          <th>신고시간</th>
          <td>{singleReportData.reportedAT}</td>
        </tr>
        <tr>
          <th>처리상태</th>
          <td>{singleReportData.handleState}</td>
        </tr>
        <tr>
          <th>처리시간</th>
          <td>{singleReportData.handledAt || '-'}</td>
        </tr>
        <tr>
          <th>신고대상</th>
          <td>{singleReportData.reporterName}</td>
        </tr>
        <tr>
          <th>신고자</th>
          <td>{singleReportData.reporterName}</td>
        </tr>
        <tr>
          <th>작성자</th>
          <td>{singleReportData.reporterName}</td>
        </tr>
        <tr>
          <th>신고유형</th>
          <td>{singleReportData.reportReason}</td>
        </tr>
        <tr>
          <th>사유</th>
          <td>{singleReportData.description}</td>
        </tr>
      </table>
    </div>
  );
};

export default Report;

const singleReportData = {
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
};
