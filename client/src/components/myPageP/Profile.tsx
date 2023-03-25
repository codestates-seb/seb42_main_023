import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import LargeProfileImg from '../common/LargeProfileImg';
import { BsPencil } from 'react-icons/bs';
import DropdownButton from './DropdownButton';
import ProfileEdit from './ProfileEdit';
import { IconBtn } from '../common/Btn';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setEditOpen,
  setEditWidth,
  setContent,
} from '../../slices/mypageSlice';
import { membersApi } from '../../api/memberapi';
import Cookies from 'js-cookie';

function Profile() {
  const dispatch = useAppDispatch();
  const { EditOpen, content } = useAppSelector(({ mypage }) => mypage);
  const { memberName } = useAppSelector(({ header }) => header);
  const divRef = useRef<HTMLDivElement>(null);
  const membersQuery = membersApi.useGetMemberQuery({
    name: memberName,
  });
  const { data, isSuccess } = membersQuery;
  const auth = Cookies.get('Authorization');

  //자기소개 input토글
  const EditOpenHandler = () => {
    dispatch(setContent(data.member.intro));
    dispatch(setEditWidth((divRef.current?.offsetWidth as number) + 30));
    dispatch(setEditOpen(!EditOpen));
  };
  //자기소개 수정
  const updateMemberMutaion = membersApi.useUpdateMemberMutation();
  const [updateMember] = updateMemberMutaion;
  const submitHandler = () => {
    dispatch(setEditOpen(!EditOpen));
    const name = localStorage.getItem('name');
    const intro = content;
    updateMember({ name, intro });
  };

  return (
    <ProfileWrap>
      <div>
        {isSuccess && <LargeProfileImg url={data.member.memberImage} />}
        <article>
          {isSuccess && (
            <h1>
              {data.member.memberName}
              {auth !== undefined &&
                (EditOpen ? (
                  <button onClick={submitHandler}>수정완료</button>
                ) : (
                  <button onClick={EditOpenHandler}>
                    <BsPencil />
                  </button>
                ))}
            </h1>
          )}
          {EditOpen ? (
            <ProfileEdit />
          ) : (
            <Intro ref={divRef}>{isSuccess && data.member.intro}</Intro>
          )}
        </article>
      </div>
      {auth !== undefined && <DropdownButton />}
    </ProfileWrap>
  );
}
export default Profile;
const ProfileWrap = styled.div`
  padding-bottom: 40px;
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
  position: relative;
  border-bottom: 1px solid var(--border-color);
  article {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 30px;
    h1 {
      font-weight: 600;
      font-size: 20px;
      margin-bottom: 10px;
      button {
        margin-left: 24px;
        :hover {
          color: var(--hover-font-gray-color);
        }
      }
    }
  }
  > div:nth-child(1) {
    display: felx;
  }
`;
const Intro = styled.div`
  width: 100%;
`;
