import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { NoimgSVG } from '../../assets/common/NoimgSVG';

const MediumProfileImg = ({ memberImg }: { memberImg: string }) => {
  const navigate = useNavigate();
  const loginUser = localStorage.getItem('name');

  const clickmemberHandler = () => {
    if (loginUser) {
      navigate(`/mypage?name=${loginUser}`);
    }
  };
  return (
    <Btn onClick={clickmemberHandler} aria-label="mypage">
      {memberImg ? (
        <Item src={memberImg} alt="memberImg" />
      ) : (
        <NoItem>
          <NoimgSVG />
        </NoItem>
      )}
    </Btn>
  );
};

export default MediumProfileImg;
const Item = styled.img`
  box-sizing: border-box;
  border-radius: 50%;
  object-fit: cover;
  width: 34px;
  height: 34px;
  cursor: pointer;

  transition: all 0.3s linear;
  :hover {
    transform: scale(1.2);
  }
`;
const Btn = styled.button`
  margin-left: 10px;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  background-color: #fff;
  overflow: hidden;
`;
const NoItem = styled.div`
  width: 34px;
  height: 34px;
  background-color: #e3e8f0;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 24px;
    height: 24px;
  }
`;
