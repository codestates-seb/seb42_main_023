import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FiMoreHorizontal } from 'react-icons/fi';
import { setIsOpenFilter, setReportType } from '../../slices/postSlice';
import { Dropdown, Btn, ListItem, List } from '../mainP/DropdownButton';
import styled from 'styled-components';

interface Props {
  memberName: string;
  setIsOpenReport?: (bool: boolean) => void;
  setIsOpenDelete: (bool: boolean) => void;
  setDeleteType?: (str: string) => void;
  isOpenReport: boolean;
  isOpenDelete: boolean;
}
const PostDropdownButton = ({
  memberName,
  setIsOpenReport,
  setIsOpenDelete,
  setDeleteType,
  isOpenReport,
  isOpenDelete,
}: Props) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => {
    return state;
  });
  const params = useParams();
  const postId = params.postId;
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const writerOptions: ['수정하기', '삭제하기'] = ['수정하기', '삭제하기'];
  const viewerOptions: ['신고하기'] = ['신고하기'];
  const loginUserName = window.localStorage.getItem('name');
  const option = memberName === loginUserName ? writerOptions : viewerOptions;
  const confirmDeleteHandler = (): void => {
    setIsOpenDelete(!isOpenDelete);
  };
  const [filterOpen, setFilterOpen] = useState(false);
  const typeChecker = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target instanceof HTMLElement) {
      setDeleteType?.(event.target.id);
    }
  };

  const reportHandler = (): void => {
    setIsOpenReport?.(!isOpenReport!);
  };

  const selectHandler = (option: '신고하기' | '수정하기' | '삭제하기') => {
    if (option === '신고하기') {
      dispatch(setReportType('post'));
      reportHandler();
    }
    if (option === '수정하기') {
      navigate(`/posts/update/${postId}`);
    }
    if (option === '삭제하기') confirmDeleteHandler();
  };

  const toggleHandler = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <Dropdown ref={dropdownRef}>
      <Btn onClick={toggleHandler}>
        <FiMoreHorizontal />
      </Btn>
      <PostDropList filterOpen={filterOpen} option={option}>
        {option.map((option) => (
          <ListItem
            id="게시글"
            key={option}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              selectHandler(option);
              dispatch(setIsOpenFilter(false));
              typeChecker(event);
            }}
          >
            {option}
          </ListItem>
        ))}
      </PostDropList>
    </Dropdown>
  );
};
export default PostDropdownButton;

interface ListProps {
  filterOpen: boolean;
  option: string[];
}
const PostDropList = styled(List)<ListProps>`
  height: ${({ filterOpen, option }) =>
    filterOpen ? (option.length === 1 ? '40px' : '80px') : '0'};
`;
