import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import LargeProfileImg from '../common/LargeProfileImg';
import DropdownButton from './DropdownButton';
import ProfileEdit from './ProfileEdit';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setEditWidth } from '../../slices/mypageSlice';
import { membersApi } from '../../api/memberapi';

function Profile() {
  const dispatch = useAppDispatch();
  const [EditOpen, setEditOpen] = useState(false);
  const [content, setContent] = useState('');
  const [blank, setBlank] = useState('');
  const { memberName } = useAppSelector(({ header }) => header);
  const divRef = useRef<HTMLDivElement>(null);
  const membersQuery = membersApi.useGetMemberQuery({
    name: memberName,
  });
  const { data, isSuccess, refetch } = membersQuery;
  const loginuser = localStorage.getItem('name');

  //회원정보에 들어올 때마다 데이터 업데이트
  useEffect(() => {
    refetch();
  }, []);

  //자기소개 input토글
  const EditOpenHandler = () => {
    setContent(data.member.intro);
    setEditOpen(!EditOpen);
    if (divRef.current !== null) {
      dispatch(setEditWidth(divRef.current?.offsetWidth + 20));
    }
  };
  //자기소개 수정
  const updateMemberMutaion = membersApi.useUpdateMemberMutation();
  const [updateMember] = updateMemberMutaion;
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
      {isSuccess && <LargeProfileImg url={data.member.memberImage} />}
      <article>
        {isSuccess && (
          <h1>
            {data.member.memberName}
            {data.member.memberName === loginuser &&
              (EditOpen ? (
                <>
                  <Finish onClick={submitHandler}>확인</Finish>
                  <span>{content.length}/500</span>
                </>
              ) : (
                <button onClick={EditOpenHandler}>소개수정</button>
              ))}
          </h1>
        )}
        {EditOpen ? (
          <ProfileEdit
            content={content}
            setContent={setContent}
            submitHandler={submitHandler}
          />
        ) : (
          <Intro ref={divRef}>{isSuccess && data.member.intro}</Intro>
        )}
        {blank && <Error>소개글이 비어있습니다.</Error>}
      </article>
      {isSuccess && data.member.memberName === loginuser && <DropdownButton />}
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
    margin-top: 30px;
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
  > div:nth-child(1) {
    display: flex;
    margin-right: 32px;
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
