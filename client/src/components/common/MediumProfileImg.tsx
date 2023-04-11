import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { membersApi } from '../../api/memberApi';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setMemberName } from '../../slices/headerSlice';
import Cookies from 'js-cookie';

const MediumProfileImg = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { memberImg } = useAppSelector(({ header }) => header);
  const loginUser = localStorage.getItem('name');
  const auth = Cookies.get('Authorization');

  const clickmemberHandler = () => {
    if (auth !== undefined && loginUser) {
      dispatch(setMemberName(loginUser));
      navigate('/mypage');
    }
  };
  return (
    <Btn onClick={clickmemberHandler}>
      <Item src={memberImg} />
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
