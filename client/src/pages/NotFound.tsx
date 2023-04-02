import React from 'react';
import styled from 'styled-components';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { WhiteBtn, BlueBtn } from '../components/common/Btn';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <NotFoundContainer>
      <AiOutlineExclamationCircle size={80} color="#d9d9d9" />
      <h1>요청하신 페이지를 찾을 수 없습니다.</h1>
      <p>
        요청하신 페이지가 제거되었거나, 이름이 변경되었거나, 일시적으로 사용이
        중단되었습니다.
      </p>
      <div>
        <GoBackBtn onClick={() => window.history.back()}>이전</GoBackBtn>
        <GoMainBtn onClick={() => navigate('/')}>Dragon Money 홈</GoMainBtn>
      </div>
    </NotFoundContainer>
  );
};

export default NotFound;

const NotFoundContainer = styled.div`
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  > h1 {
    font-weight: 700;
    font-size: 20px;
  }
`;
const GoBackBtn = styled(WhiteBtn)`
  width: 200px;
  padding: 10px 30px;
  margin-right: 10px;
`;

const GoMainBtn = styled(BlueBtn)`
  width: 200px;
  padding: 10px 30px;
  margin-left: 10px;
`;
