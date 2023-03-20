import React from 'react';
import NavAdmin from '../components/handleReport/NavAdmin';
import styled from 'styled-components';

function HandledPost() {
  return (
    <HandledPostMain>
      <NavAdmin />
    </HandledPostMain>
  );
}

export default HandledPost;

const HandledPostMain = styled.div`
  background-color: red;
  width: 100%;
  height: 100vh;
`;
