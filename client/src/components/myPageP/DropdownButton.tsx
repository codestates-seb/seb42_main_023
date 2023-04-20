import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Dropdown, Btn, List, ListItem, Props } from '../mainP/DropdownButton';
import { useAppDispatch } from '../../hooks';
import { setDeleteAccountOpen } from '../../slices/mypageSlice';
import { FiMoreHorizontal } from 'react-icons/fi';
import Cookies from 'js-cookie';

const DropdownButton = () => {
  const dispatch = useAppDispatch();
  const [filterOpen, setFilterOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const options: ['로그아웃', '회원탈퇴'] = ['로그아웃', '회원탈퇴'];

  const selectFilterHandler = (option: '로그아웃' | '회원탈퇴') => {
    setFilterOpen(false);

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
    setFilterOpen(!filterOpen);
  };

  const clickOutsideHandler = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setFilterOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', clickOutsideHandler);
    return () => {
      document.removeEventListener('mousedown', clickOutsideHandler);
    };
  }, []);

  return (
    <DropDownContainer ref={dropdownRef}>
      <Btn onClick={openFilterHandler} aria-label="memberMenu">
        <FiMoreHorizontal />
      </Btn>
      <MyList filterOpen={filterOpen}>
        {options.map((option) => (
          <ListItem key={option} onClick={() => selectFilterHandler(option)}>
            {option}
          </ListItem>
        ))}
      </MyList>
    </DropDownContainer>
  );
};

export default DropdownButton;

const DropDownContainer = styled(Dropdown)`
  position: absolute;
  right: 0;
  top: 0;
`;
const MyList = styled(List)<Props>`
  height: ${({ filterOpen }) => (filterOpen ? '80px' : '0')};
`;
