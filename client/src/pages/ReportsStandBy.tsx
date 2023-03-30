import React, { useState } from 'react';
import styled from 'styled-components';
import NavAdmin from '../components/AdminP/NavAdmin';
import ReportList from '../components/AdminP/ReportList';
import { useGetReportsStandByQuery } from '../api/reportApi';
// import { useAppSelector } from '../hooks';

const ReportsStandBy = () => {
  // const { page, orderby, isReviewOpen } = useAppSelector(
  //   ({ report }) => report,
  // );

  const [currentPage, setCurrentPage] = useState(1);
  const [orderby, setOrderby] = useState('all');

  const { data, isSuccess } = useGetReportsStandByQuery({
    page: currentPage,
    orderby: orderby,
  });

  console.log('DATA:', data);

  return (
    <AdminMain>
      <NavAdmin />
      <ReportList
        reportData={data}
        isSuccess={isSuccess}
        standby={true}
        setCurrentPage={setCurrentPage}
        setOrderby={setOrderby}
      />
    </AdminMain>
  );
};

export default ReportsStandBy;

// Admin 페이지의 main
const AdminMain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
