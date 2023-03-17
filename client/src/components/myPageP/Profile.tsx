import React from 'react';
import styled from 'styled-components';
import LargeProfileImg from '../common/LargeProfileImg';
import { BsPencil } from 'react-icons/bs';
import DropdownButton from './DropdownButton';
import { IconBtn } from '../common/Btn';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setEditOpen } from '../../slices/mypageSlice';
function Profile() {
  const dispatch = useAppDispatch();
  const content = '안녕하세요.저는 돈버는 토끼입니다.모두 부자되세요.';
  const { EditOpen } = useAppSelector(({ mypage }) => mypage);

  const EditOpenHandler = () => {
    dispatch(setEditOpen(!EditOpen));
  };
  return (
    <ProfileWrap>
      <div>
        <LargeProfileImg />
        <article>
          <h1>Bunny</h1>
          {EditOpen ? (
            <Input>
              <input value={content}></input>
              <button onClick={EditOpenHandler}>저장</button>
            </Input>
          ) : (
            <span>
              {content}
              <IconBtn onClick={EditOpenHandler}>
                <BsPencil />
              </IconBtn>
            </span>
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
const Input = styled.div`
  display: flex;
  input {
    width: 40vw;
    :focus {
      outline: none;
    }
  }
  button {
    width: 40px;

    :hover {
      color: var(--point-blue-color);
    }
  }
`;
