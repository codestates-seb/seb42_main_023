import React, { useRef } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setFilter,
  setFilterOpen,
  setDeleteAccountOpen,
} from '../../slices/mypageSlice';
import { useDeleteMemberMutation } from '../../api/memberapi'; // TODO: 이 줄의 코드를 옮겨주세요
import { FiMoreHorizontal } from 'react-icons/fi';
import Cookies from 'js-cookie';

const DropdownButton = () => {
  const dispatch = useAppDispatch();
  const { dropOpen } = useAppSelector(({ mypage }) => mypage);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const options: ['로그아웃', '회원탈퇴'] = ['로그아웃', '회원탈퇴'];

  // TODO: 아래 코드를 옮겨주세요 (20 ~ 21번째 줄)
  const name = localStorage.getItem('name');
  const [deleteMember] = useDeleteMemberMutation();

  const handleSelect = (option: '로그아웃' | '회원탈퇴') => {
    dispatch(setFilterOpen(false));

    // 회원탈퇴 시 확인메세지창을 띄우고, '네'를 클릭시 회원탈퇴가 되며 저장되어 있던 쿠키와 유저정보를 제거한다.
    if (option === '회원탈퇴') {
      dispatch(setDeleteAccountOpen(true));

      // TODO: 아래 코드를 옮겨주세요 (30 ~ 34번째 줄)
      deleteMember(name);
      Cookies.remove('Authorization');
      Cookies.remove('Refresh');
      localStorage.clear();
      window.location.href = '/';
    }
    // 로그아웃시 저장되어 있던 쿠키와, 로컬스토리지에 있던 유저 정보를 제거한다.
    if (option === '로그아웃') {
      Cookies.remove('Authorization');
      Cookies.remove('Refresh');
      localStorage.clear();
      window.location.href = '/';
    }
  };

  const handleToggle = () => {
    console.log(dropOpen);
    dispatch(setFilterOpen(!dropOpen));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      dispatch(setFilterOpen(false));
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Dropdown ref={dropdownRef}>
      <Button onClick={handleToggle}>
        <FiMoreHorizontal />
      </Button>
      {dropOpen && (
        <List>
          {options.map((option) => (
            <ListItem key={option} onClick={() => handleSelect(option)}>
              {option}
            </ListItem>
          ))}
        </List>
      )}
    </Dropdown>
  );
};

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const Button = styled.button`
  border: none;
  width: 78px;
  height: 40px;
  background-color: #fff;
  svg {
    margin-left: 2px;
    transform: translateY(2px);
  }
`;

const List = styled.ul`
  position: absolute;
  top: 40px;
  left: 0;
  z-index: 1;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.15);
`;

const ListItem = styled.li`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  box-sizing: border-box;
  &:hover {
    background-color: #e6e6e6;
  }
`;

export default DropdownButton;
