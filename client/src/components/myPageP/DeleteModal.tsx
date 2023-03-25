import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFilter } from '../../slices/mypageSlice';
import { SidebarBtn } from '../common/Btn';
import { membersApi } from '../../api/memberapi';
import { setDeleteAccountOpen } from '../../slices/mypageSlice';
import { BlueBtn, WhiteBtn } from '../../components/common/Btn';
import axios from 'axios';
import Cookies from 'js-cookie';

function DeleteModal() {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

  const removeMemberMutaion = membersApi.useDeleteMemberMutation();
  const [removeMember] = removeMemberMutaion;

  const DeleteAccounthandler = () => {
    Cookies.remove('Authorization');
    Cookies.remove('Refresh');
    const name = localStorage.getItem('name');
    removeMember({ name });
    localStorage.clear();
    window.location.href = '/';
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      dispatch(setDeleteAccountOpen(false));
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <ModalWrap>
      <ModalBox ref={modalRef}>
        <h1>회원탈퇴</h1>
        <div>정말 탈퇴하시겠습니까?</div>
        <div>
          <NoBtn onClick={() => dispatch(setDeleteAccountOpen(false))}>
            아니요
          </NoBtn>
          <YesBtn onClick={DeleteAccounthandler}>네, 탈퇴하겠습니다</YesBtn>
        </div>
      </ModalBox>
    </ModalWrap>
  );
}

export default DeleteModal;
const ModalWrap = styled.div`
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    padding-bottom: 4px;
    margin-bottom: 10px;
    border-bottom: 1px solid var(--border-color);
    font-weight: 600;
  }
  div {
    :first-child {
      margin-bottom: 20px;
    }
  }
`;
const ModalBox = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  padding: 20px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.15);
`;
const NoBtn = styled(WhiteBtn)`
  padding: 10px;
  margin-top: 20px;
`;
const YesBtn = styled(BlueBtn)`
  padding: 10px;
  margin-left: 4px;
`;
