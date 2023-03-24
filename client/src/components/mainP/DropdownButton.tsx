import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFilter, setFilterOpen, setOrderby } from '../../slices/mainSlice';
import { setCurrentPage } from '../../slices/mainSlice';

const DropdownButton = () => {
  const dispatch = useAppDispatch();
  const { filter, filterOpen } = useAppSelector(({ main }) => main);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const options: ['최신순', '좋아요순', '조회순'] = [
    '최신순',
    '좋아요순',
    '조회순',
  ];

  const handleSelect = (option: '최신순' | '좋아요순' | '조회순') => {
    dispatch(setFilter(option));
    dispatch(setFilterOpen(false));
    if (option === '최신순') {
      dispatch(setCurrentPage(1));
      dispatch(setOrderby('latest'));
    }
    if (option === '좋아요순') {
      dispatch(setCurrentPage(1));
      dispatch(setOrderby('thumbup'));
    }
    if (option === '조회순') {
      dispatch(setCurrentPage(1));
      dispatch(setOrderby('view-count'));
    }
  };

  const handleToggle = () => {
    dispatch(setFilterOpen(!filterOpen));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      dispatch(setFilterOpen(false));
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Dropdown ref={dropdownRef}>
      <Button onClick={handleToggle}>
        {filter}
        <BsFillCaretDownFill />
      </Button>
      {filterOpen && (
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
  cursor: pointer;
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
  top: 100%;
  left: 0;
  z-index: 1;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
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
