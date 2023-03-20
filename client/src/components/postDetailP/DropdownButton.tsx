import React, { useRef } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FiMoreHorizontal } from 'react-icons/fi';
import { setIsOpenFilter } from '../../slices/postSlice';

const DropdownButton = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => {
    return state;
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const options: ['신고하기', '수정하기', '삭제하기'] = [
    '신고하기',
    '수정하기',
    '삭제하기',
  ];

  const handleSelect = (option: '신고하기' | '수정하기' | '삭제하기') => {
    console.log(option);

    dispatch(setIsOpenFilter(false));
  };

  const handleToggle = () => {
    dispatch(setIsOpenFilter(!state.post.isOpenFilter));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      dispatch(setIsOpenFilter(false));
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
      {state.post.isOpenFilter && (
        <List>
          {options.map((option) => (
            <ListItem key={option} onClick={(): void => handleSelect(option)}>
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
  width: 100px;
  height: 40px;
  position: absolute;
  bottom: -20px;
  background-color: #fff;
  svg {
    margin-left: 2px;
    transform: translateX(-50px) translateY(3px);
  }
`;

const List = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  top: 10px;
  left: 15px;
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
