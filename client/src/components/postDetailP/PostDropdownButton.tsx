// 패키지 등
import React, { useRef } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
// 컴포넌트(아이콘)
import { FiMoreHorizontal } from 'react-icons/fi';
// slices
import { setIsOpenFilter, setReportType } from '../../slices/postSlice';

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

  // 삭제 확인 모달창
  const confirmDeleteHandler = (): void => {
    setIsOpenDelete(!isOpenDelete);
  };

  const typeChecker = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target instanceof HTMLElement) {
      setDeleteType?.(event.target.id);
    }
  };

  // 신고 모달창 오픈
  const reportHandler = (): void => {
    setIsOpenReport?.(!isOpenReport!);
  };

  // Select option에 따른 로직
  const handleSelect = (option: '신고하기' | '수정하기' | '삭제하기') => {
    if (option === '신고하기') {
      dispatch(setReportType('post'));
      reportHandler();
    }
    if (option === '수정하기') {
      navigate(`/posts/update/${postId}`);
    }
    if (option === '삭제하기') confirmDeleteHandler();
  };

  const handleToggle = () => {
    if (!state.post.isOpenFilter) {
      dispatch(setIsOpenFilter(state.post?.isOpenFilter));
    }
  };

  return (
    <Dropdown ref={dropdownRef}>
      <Button onClick={handleToggle}>
        <FiMoreHorizontal />
      </Button>
      {state.post.isOpenFilter && (
        <List>
          {option.map((option) => (
            <ListItem
              id="게시글"
              key={option}
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                handleSelect(option);
                dispatch(setIsOpenFilter(false));
                typeChecker(event);
              }}
            >
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
  width: 20px;
  height: 40px;
  position: absolute;
  left: 45px;
  bottom: -20px;
  background-color: #fff;
  svg {
    margin-left: 2px;
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

export default PostDropdownButton;