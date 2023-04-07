import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../hooks';
import { setDeleteAccountOpen } from '../../slices/mypageSlice';
import { useDeleteMemberMutation } from '../../api/memberapi';
import { BlueBtn, WhiteBtn } from '../../components/common/Btn';
import Cookies from 'js-cookie';

function DeleteModal() {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const name = localStorage.getItem('name');
  const [deleteMember] = useDeleteMemberMutation();

  const DeleteAccounthandler = () => {
    deleteMember(name);
    Cookies.remove('Authorization');
    Cookies.remove('Refresh');
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
  );
}

export default DeleteModal;

const ModalBox = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  padding: 26px;
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
