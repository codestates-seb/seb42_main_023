import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MdCancel } from 'react-icons/md';
import { useAppDispatch } from '../../hooks';
import { deleteTag } from '../../slices/postInputSlice';
import { deleteSarchTag } from '../../slices/headerSlice';

interface Props {
  content: string;
  button?: string;
  search?: boolean;
}
//content props = 태그의 문자열
//button props = 태그의 삭제 버튼 출력 여부
//search props = 태그 삭제시 저장 state 분기

const Tag = ({ content, button, search }: Props) => {
  const dispatch = useAppDispatch();
  const deleteTagHandler = () => {
    dispatch(deleteTag(content));
  };
  const deleteSearchTagHandler = () => {
    dispatch(deleteSarchTag(content));
  };
  return (
    <>
      <Item>
        <span>{content}</span>
        {!button && (
          <button onClick={search ? deleteSearchTagHandler : deleteTagHandler}>
            <MdCancel size="13" />
          </button>
        )}
      </Item>
    </>
  );
};

export default Tag;
const Item = styled.button`
  position: relative;
  display: inline-flex;
  background-color: #e3e8f0;
  box-sizing: border-box;
  padding: 4px 0;
  padding-left: 10px;
  padding-right: 24px;
  border-radius: 30px;
  margin-right: 4px;
  span {
    font-size: 13px;
  }
  button {
    position: absolute;
    right: 5px;
    top: 3px;
    align-items: center;
    background-color: #e3e8f0;
    margin-left: 4px;
    svg {
      color: #b4c2d6;
      :hover {
        color: #72839d;
      }
    }
  }
`;
