import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import LargeProfileImg from '../common/LargeProfileImg';
import { BsPencil } from 'react-icons/bs';
import DropdownButton from './DropdownButton';
import ProfileEdit from './ProfileEdit';
import { IconBtn } from '../common/Btn';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setEditOpen, setEditWidth } from '../../slices/mypageSlice';
function Profile() {
  const dispatch = useAppDispatch();
  const { EditOpen, content } = useAppSelector(({ mypage }) => mypage);
  const divRef = useRef<HTMLDivElement>(null);
  //자기소개 input토글
  const EditOpenHandler = () => {
    dispatch(setEditWidth(divRef.current?.offsetWidth as number));
    dispatch(setEditOpen(!EditOpen));
  };

  return (
    <ProfileWrap>
      <div>
        <LargeProfileImg />
        <article>
          <h1>Bunny</h1>
          {EditOpen ? (
            <ProfileEdit />
          ) : (
            <div ref={divRef}>
              {content}
              <EditBtn onClick={EditOpenHandler}>
                <BsPencil />
              </EditBtn>
            </div>
          )}
        </article>
      </div>
      <DropdownButton />
    </ProfileWrap>
  );
}

export default Profile;

const ProfileWrap = styled.div`
  margin-bottom: 40px;
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
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
  > div:nth-child(1) {
    display: felx;
  }
`;
const EditBtn = styled(IconBtn)`
  margin-left: 24px;
`;
