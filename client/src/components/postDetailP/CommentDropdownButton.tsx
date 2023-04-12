import React, { useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { CommentProps } from '../../types/PostDetail';
import {
  setFilter,
  setFilterOpen,
  setOrderby,
} from '../../slices/commentSlice';
import { Dropdown, Btn, List, ListItem } from '../mainP/DropdownButton';

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
      <Btn onClick={toggleHandler}>
        {filter}
        <BsFillCaretDownFill />
      </Btn>
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

export default CommentDropDropdownButton;
