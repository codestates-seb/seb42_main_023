import React from 'react';
import styled from 'styled-components';

const ProfilePreview = () => {
  return (
    <ProfilePreviewContainer>
      <ConfirmUserInfoBtn>더 보기</ConfirmUserInfoBtn>
    </ProfilePreviewContainer>
  );
};

export default ProfilePreview;

const ProfilePreviewContainer = styled.div`
  width: 240px;
  height: 140px;
  margin-top: 30px;
  border: 1px solid #d4d4d4;
`;

const ConfirmUserInfoBtn = styled.button`
  /* width: 50px;
  height: 30px;
  padding: 0 10px 0 10px;
  background-color: white;
  position: absolute;
  top: 10px;
  right: 15px;
  color: gray; */
  cursor: pointer;
`;
