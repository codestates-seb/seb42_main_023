import React, { useState } from 'react';
import styled from 'styled-components';
import NavAdmin from '../components/AdminP/NavAdmin';
import ReportList from '../components/AdminP/ReportList';
import { useGetReportsDeletedQuery } from '../api/reportApi';
import { useAppSelector, useAppDispatch } from '../hooks';

const ReportsDeleted = () => {
  const dispatch = useAppDispatch();

  const { page, orderby } = useAppSelector(({ report }) => report);
  const { data } = useGetReportsDeletedQuery({
    page,
    orderby,
  });

  return (
    <AdminMain>
      <NavAdmin />
      <ReportList reportData={data} standby={false} />
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
