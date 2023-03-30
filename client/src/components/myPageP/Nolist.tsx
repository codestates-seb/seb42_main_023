import React from 'react';
import styled from 'styled-components';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
const Nolist = ({ name }: { name: string }) => {
  return (
    <NolistWrap>
      <div>
        <AiOutlineExclamationCircle size={100} color={'#94969b'} />
      </div>
      <div>{name} 없습니다</div>
    </NolistWrap>
  );
};
export default Nolist;
const NolistWrap = styled.div`
  width: 100%;
  height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: var(--sub-font-color);
  svg {
    margin-bottom: 10px;
  }
`;
