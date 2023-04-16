import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function PostBtn() {
  const navigate = useNavigate();
  // 로그인 확인

  return (
    <>
      <Btn
        onClick={() => {
          navigate('/posts/create');
          location.reload();
        }}
        id="post"
      >
        글쓰기
      </Btn>
    </>
  );
}

export default PostBtn;
const Btn = styled.button`
  padding: 4px 14px;
  width: 80px;
  box-sizing: border-box;
  border: 1px solid var(--border-color);
  background-color: #fff;
  margin-left: 4px;
  font-size: 14px;
  :hover {
    background-color: var(--hover-button-color);
    transition: 0.3s;
    color: var(--hover-font-gray-color);
  }
  @media (max-width: 1100px) {
    transform: translateY(4px);
  }
`;
