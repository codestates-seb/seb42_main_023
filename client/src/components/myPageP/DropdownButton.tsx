import React, { useRef } from 'react';
import { Dropdown, Btn, List, ListItem } from '../mainP/DropdownButton';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFilterOpen, setDeleteAccountOpen } from '../../slices/mypageSlice';
import { FiMoreHorizontal } from 'react-icons/fi';
import Cookies from 'js-cookie';

const DropdownButton = () => {
  const dispatch = useAppDispatch();
  const { dropOpen } = useAppSelector(({ mypage }) => mypage);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const options: ['로그아웃', '회원탈퇴'] = ['로그아웃', '회원탈퇴'];

  const selectFilterHandler = (option: '로그아웃' | '회원탈퇴') => {
    dispatch(setFilterOpen(false));

    if (option === '회원탈퇴') {
      dispatch(setDeleteAccountOpen(true));
    }
    if (option === '로그아웃') {
      Cookies.remove('Authorization');
      Cookies.remove('Refresh');
      localStorage.clear();
      window.location.href = '/';
    }
  };

  const openFilterHandler = () => {
    dispatch(setFilterOpen(!dropOpen));
  };

  const clickOutsideHandler = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      dispatch(setFilterOpen(false));
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', clickOutsideHandler);
    return () => {
      document.removeEventListener('mousedown', clickOutsideHandler);
    };
  }, []);

  return (
    <Dropdown ref={dropdownRef}>
      <Btn onClick={openFilterHandler} aria-label="memberMenu">
        <FiMoreHorizontal />
      </Btn>
      {dropOpen && (
        <List>
          {options.map((option) => (
            <ListItem key={option} onClick={() => selectFilterHandler(option)}>
              {option}
            </ListItem>
          ))}
        </List>
      )}
    </Dropdown>
  );
};

export default DropdownButton;
