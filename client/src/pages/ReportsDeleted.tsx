import React, { useState } from 'react';
import styled from 'styled-components';
import NavAdmin from '../components/AdminP/NavAdmin';
import ReportList from '../components/AdminP/ReportList';
import { useGetReportsDeletedQuery } from '../api/reportApi';

const ReportsDeleted: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orderby, setOrderby] = useState('all');

  const { data, isSuccess } = useGetReportsDeletedQuery({
    page: currentPage,
    orderby: orderby,
  });

  return (
    <Container>
      <NavAdmin />
      <ReportList
        reportData={data}
        isSuccess={isSuccess}
        standby={false}
        setCurrentPage={setCurrentPage}
        setOrderby={setOrderby}
      />
    </Container>
  );
};

export default ReportsDeleted;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
