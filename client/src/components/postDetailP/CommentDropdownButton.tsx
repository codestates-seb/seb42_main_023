import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { CommentProps } from '../../types/Post';
import {
  setFilter,
  setFilterOpen,
  setOrderby,
} from '../../slices/commentSlice';

const CommentDropDropdownButton = ({ setPage }: Partial<CommentProps>) => {
  const dispatch = useAppDispatch();
  const { filter, filterOpen } = useAppSelector(({ comment }) => comment);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const options: ['최신순', '좋아요순'] = ['최신순', '좋아요순'];

  const selectHandler = (option: '최신순' | '좋아요순') => {
    dispatch(setFilter(option));
    dispatch(setFilterOpen(false));
    if (option === '최신순') {
      dispatch(setOrderby('latest'));
      setPage!(1);
    }
    if (option === '좋아요순') {
      dispatch(setOrderby('thumbup'));
      setPage!(1);
    }
  };
  const toggleHandler = () => {
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
      <Button onClick={toggleHandler}>
        {filter}
        <BsFillCaretDownFill />
      </Button>
      {filterOpen && (
        <List>
          {options.map((option) => (
            <ListItem key={option} onClick={() => selectHandler(option)}>
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
  z-index: 5;
  width: max-content;
`;

const Button = styled.button`
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
  min-width: 80px;
  cursor: pointer;
  box-sizing: border-box;
  &:hover {
    background-color: #e6e6e6;
  }
`;

export default CommentDropDropdownButton;
