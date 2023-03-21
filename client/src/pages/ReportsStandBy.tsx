import React from 'react';
import NavAdmin from '../components/AdminP/NavAdmin';
import styled from 'styled-components';

function ReportsStandBy() {
  return (
    <HandledPostMain>
      <NavAdmin />
    </HandledPostMain>
  );
}

export default ReportsStandBy;

const HandledPostMain = styled.div`
  background-color: red;
  width: 100%;
  height: 100vh;
`;
