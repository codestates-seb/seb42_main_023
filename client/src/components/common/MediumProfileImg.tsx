import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { membersApi } from '../../api/memberapi';
import { useAppSelector } from '../../hooks';

const MediumProfileImg = () => {
  const navigate = useNavigate();
  const { memberName } = useAppSelector(({ header }) => header);
  const membersQuery = membersApi.useGetMemberQuery({
    name: memberName,
  });
  const { data, isSuccess } = membersQuery;
  return (
    <Btn onClick={() => navigate('/mypage')}>
      {isSuccess && <Item src={data.member.memberImage} />}
    </Btn>
  );
};

export default MediumProfileImg;
const Item = styled.img`
  box-sizing: border-box;
  border-radius: 50%;
  object-fit: cover;
  width: 50px;
  height: 50px;
  cursor: pointer;

  transition: all 0.3s linear;
  :hover {
    transform: scale(1.2);
  }
`;
const Btn = styled.button`
  margin-left: 10px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-color: #fff;
  overflow: hidden;
`;
