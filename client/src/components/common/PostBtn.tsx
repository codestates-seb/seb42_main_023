import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Btn = styled.button`
  height: 40px;
  width: 100px;
  background-color: #0069ca;
  color: #fff;
  box-sizing: border-box;
`;

function PostBtn() {
<<<<<<< HEAD
  const navigate = useNavigate();
  // 로그인 확인

  return (
    <>
      <Btn
        onClick={() => {
          navigate('/posts/create');
          location.reload();
        }}
      >
        글쓰기
      </Btn>
=======
  return (
    <>
      <Btn>글쓰기</Btn>
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
    </>
  );
}

export default PostBtn;
<<<<<<< HEAD
const Btn = styled.button`
  padding: 4px 14px;
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
`;
=======
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
