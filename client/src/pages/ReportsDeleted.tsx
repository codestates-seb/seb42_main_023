import React, { useState } from 'react';
import styled from 'styled-components';
import NavAdmin from '../components/AdminP/NavAdmin';
import ReportList from '../components/AdminP/ReportList';
import { useGetReportsDeletedQuery } from '../api/reportApi';

const ReportsDeleted = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orderby, setOrderby] = useState('all');

  const { data, isSuccess } = useGetReportsDeletedQuery({
    page: currentPage,
    orderby: orderby,
  });

  return (
    <AdminMain>
      <NavAdmin />
      <ReportList
        reportData={data}
        isSuccess={isSuccess}
        standby={false}
        setCurrentPage={setCurrentPage}
        setOrderby={setOrderby}
      />
    </AdminMain>
  );
};

export default ReportsDeleted;

// Admin 페이지의 main
const AdminMain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
