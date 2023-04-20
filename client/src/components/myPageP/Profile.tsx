import React, { useState } from 'react';
import styled from 'styled-components';
import LargeProfileImg from '../common/LargeProfileImg';
import DropdownButton from './DropdownButton';
import ProfileEdit from './ProfileEdit';
import { useAppDispatch } from '../../hooks';
import { useUpdateMemberMutation } from '../../api/membersApi';

interface Member {
  memberImage: string;
  memberName: string;
  intro: string;
}

function Profile({ member }: { member: Member }) {
  const dispatch = useAppDispatch();
  const [EditOpen, setEditOpen] = useState(false);
  const [content, setContent] = useState('');
  const [blank, setBlank] = useState('');
  const loginuser = localStorage.getItem('name');

  const EditOpenHandler = () => {
    if (member.intro) {
      setContent(member.intro);
    }
    setEditOpen(!EditOpen);
  };

  const [updateMember] = useUpdateMemberMutation();
  const submitHandler = () => {
    if (content.length === 0) {
      setBlank('소개글이 비어 있습니다.');
      return;
    } else {
      setEditOpen(!EditOpen);
      const name = localStorage.getItem('name');
      const intro = content;
      updateMember({ name, intro });
      setBlank('');
    }
  };

  return (
    <ProfileWrap>
      <LargeProfileImg url={member.memberImage} />
      <article>
        <h1>
          {member.memberName}
          {member.memberName === loginuser &&
            (EditOpen ? (
              <>
                <Finish onClick={submitHandler}>확인</Finish>
              </>
            ) : (
              <button onClick={EditOpenHandler}>소개수정</button>
            ))}
        </h1>
        {EditOpen ? (
          <EditContainer>
            <ProfileEdit content={content} setContent={setContent} />
            <Leng>{content.length}/500</Leng>
          </EditContainer>
        ) : (
          <Intro> {member.intro}</Intro>
        )}
        {blank && <Error>소개글이 비어있습니다.</Error>}
        {member.memberName === loginuser && <DropdownButton />}
      </article>
    </ProfileWrap>
  );
}
export default Profile;
const ProfileWrap = styled.div`
  padding-bottom: 40px;
  display: flex;
  position: relative;
  border-bottom: 1px solid var(--border-color);
  article {
    flex-direction: column;
    justify-content: center;
    margin-top: 12px;
    width: 100%;
    h1 {
      font-weight: 600;
      font-size: 20px;
      margin-bottom: 10px;
      button {
        margin-left: 24px;
        font-size: 12px;
        .finish {
          color: var(--point-blue-color);
        }
      }
      span {
        position: absolute;
        right: 70px;
        font-size: 12px;
        top: 42px;
        color: var(--sub-font-color);
        .red {
          color: var(--error-red-color);
        }
      }
    }
  }
  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
    article {
      text-align: center;
      h1 {
        button {
          position: absolute;
          top: 99px;
        }
      }
    }
  }
`;
const EditContainer = styled.div`
  @media (max-width: 1100px) {
    margin: 0 10px;
  }
`;
const Finish = styled.button`
  color: var(--point-blue-color);
  :hover {
    color: var(--hover-point-blue-color);
  }
`;
const Intro = styled.div`
  @media (max-width: 1100px) {
    margin: 0 10px;
  }
`;
const Error = styled.span`
  position: absolute;
  font-size: 12px;
  color: var(--error-red-color);
  margin-top: 4px;
`;
const Leng = styled.div`
  font-size: 12px;
  color: var(--sub-font-color);
  text-align: end;
  padding-top: 10px;
`;
