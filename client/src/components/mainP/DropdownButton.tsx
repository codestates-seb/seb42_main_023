import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { useAppDispatch } from '../../hooks';
import { setOrderby } from '../../slices/mainSlice';

const DropdownButton = () => {
  const dispatch = useAppDispatch();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState('최신순');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const options: ['최신순', '좋아요순', '조회순'] = [
    '최신순',
    '좋아요순',
    '조회순',
  ];

  const selectFilterHandler = (option: '최신순' | '좋아요순' | '조회순') => {
    setFilter(option);
    setFilterOpen(false);
    if (option === '최신순') {
      dispatch(setOrderby('latest'));
    }
    if (option === '좋아요순') {
      dispatch(setOrderby('thumbup'));
    }
    if (option === '조회순') {
      dispatch(setOrderby('view-count'));
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

  useEffect(() => {
    document.addEventListener('mousedown', clickOutsideHandler);
    return () => {
      document.removeEventListener('mousedown', clickOutsideHandler);
    };
  }, []);

  return (
    <Dropdown ref={dropdownRef}>
      <Btn onClick={openFilterHandler}>
        {filter}
        <BsFillCaretDownFill />
      </Btn>
      {filterOpen && (
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

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  z-index: 5;
  width: max-content;
`;

export const Btn = styled.button`
  border: none;
  cursor: pointer;
  width: 78px;
  height: 40px;
  transform: translateY(-4px);
  svg {
    margin-left: 2px;
    transform: translateY(2px);
  }
  :hover {
    color: var(--hover-font-gray-color);
  }
`;

export const List = styled.ul`
  position: absolute;
  top: 30px;
  left: 0;
  z-index: 1;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
`;

export const ListItem = styled.li`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  box-sizing: border-box;
  &:hover {
    background-color: #e6e6e6;
  }
`;

export default DropdownButton;
