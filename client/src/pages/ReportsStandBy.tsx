import React, { useState } from 'react';
import styled from 'styled-components';
import NavAdmin from '../components/AdminP/NavAdmin';
import ReportList from '../components/AdminP/ReportList';
import { useGetReportsStandByQuery } from '../api/reportApi';

const ReportsStandBy: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orderby, setOrderby] = useState('all');

  const { data, isSuccess } = useGetReportsStandByQuery({
    page: currentPage,
    orderby: orderby,
  });

  console.log('DATA:', data);

  return (
    <Container>
      <NavAdmin />
      <ReportList
        reportData={data}
        isSuccess={isSuccess}
        standby={true}
        setCurrentPage={setCurrentPage}
        setOrderby={setOrderby}
      />
    </Container>
  );
};

export default ReportsStandBy;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
