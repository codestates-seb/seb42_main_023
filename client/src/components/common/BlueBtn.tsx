import React from 'react';
import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

const Btn = styled.button<Button>`
  background-color: #0069ca;
  color: #fff;
  box-sizing: border-box;
  cursor: pointer;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content?: React.ReactNode;
  width?: string | undefined;
  height?: string | undefined;
}
interface Button {
  width?: string | undefined;
  height?: string | undefined;
}

const BlueBtn: React.FC<IProps> = ({ content, ...props }) => {
  return <button {...props}>{content}</button>;
};

export default BlueBtn;
