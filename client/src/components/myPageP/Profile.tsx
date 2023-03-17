import React from 'react';
import styled from 'styled-components';
import LargeProfileImg from '../common/LargeProfileImg';
import { BsPencil } from 'react-icons/bs';
import { FiMoreHorizontal } from 'react-icons/fi';
import { IconBtn } from '../common/Btn';
function Profile() {
  const content = '안녕하세요.저는 돈버는 토끼입니다.모두 부자되세요.';
  return (
    <ProfileWrap>
      <LargeProfileImg />
      <article>
        <h1>Bunny</h1>
        <span>
          {content}{' '}
          <IconBtn>
            <BsPencil />
          </IconBtn>
        </span>
      </article>
      <More>
        <FiMoreHorizontal />
      </More>
    </ProfileWrap>
  );
}

export default Profile;

const ProfileWrap = styled.div`
  margin-bottom: 40px;
  margin-left: 10px;
  display: flex;
  position: relative;
  article {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 30px;
    h1 {
      font-weight: 600;
      font-size: 20px;
      margin-bottom: 10px;
    }
  }
`;
const More = styled(IconBtn)`
  position: absolute;
  right: 0;
  top: 30px;
`;
