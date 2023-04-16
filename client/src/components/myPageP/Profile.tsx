import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import LargeProfileImg from '../common/LargeProfileImg';
import DropdownButton from './DropdownButton';
import ProfileEdit from './ProfileEdit';
import { useAppDispatch } from '../../hooks';
import { setEditWidth } from '../../slices/mypageSlice';
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
  const divRef = useRef<HTMLDivElement>(null);
  const loginuser = localStorage.getItem('name');

  const EditOpenHandler = () => {
    if (member.intro) {
      setContent(member.intro);
    }
    setEditOpen(!EditOpen);
    if (divRef.current !== null) {
      dispatch(setEditWidth(divRef.current?.offsetWidth + 20));
    }
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
          <>
            <ProfileEdit content={content} setContent={setContent} />
            <Leng>{content.length}/500</Leng>
          </>
        ) : (
          <Intro ref={divRef}> {member.intro}</Intro>
        )}
        {blank && <Error>소개글이 비어있습니다.</Error>}
      </article>
      {member.memberName === loginuser && <DropdownButton />}
    </ProfileWrap>
  );
}
export default Profile;
const ProfileWrap = styled.div`
  padding-bottom: 40px;
  padding-left: 10px;
  display: flex;
  position: relative;
  border-bottom: 1px solid var(--border-color);
  article {
    flex-direction: column;
    justify-content: center;
    margin-top: 12px;
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
`;
const Finish = styled.button`
  color: var(--point-blue-color);
  :hover {
    color: var(--hover-point-blue-color);
  }
`;
const Intro = styled.div`
  width: 900px;
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
