import React from 'react';
import styled from 'styled-components';
import { MdCancel } from 'react-icons/md';
import { useAppDispatch } from '../../hooks';
import { deleteTag } from '../../slices/postInputSlice';

interface Props {
  content: string;
  button?: string;
}

const Tag = ({ content, button }: Props) => {
  const dispatch = useAppDispatch();

  const deleteTagHandler = () => {
    console.log(content);
    dispatch(deleteTag(content));
  };
  return (
    <>
      <Item>
        <span>{content}</span>
        {!button && (
          <button onClick={deleteTagHandler}>
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
