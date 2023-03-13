import React from 'react';
import styled from 'styled-components';
import { MdCancel } from 'react-icons/md';
import { useAppDispatch } from '../../hooks';
import { deleteTag } from '../../slices/postInputSlice';

const Item = styled.button`
  display: inline-flex;
  background-color: #e3e8f0;
  box-sizing: border-box;
  padding: 4px 6px;
  margin-right: 4px;
  border-radius: 30px;
  span {
    font-size: 13px;
  }
  button {
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

interface Props {
  content: string;
}

const Tag = ({ content }: Props) => {
  const dispatch = useAppDispatch();

  const deleteTagHandler = () => {
    console.log(content);
    dispatch(deleteTag(content));
  };
  return (
    <>
      <Item>
        <span>{content}</span>
        <button onClick={deleteTagHandler}>
          <MdCancel size="13" />
        </button>
      </Item>
    </>
  );
};

export default Tag;
