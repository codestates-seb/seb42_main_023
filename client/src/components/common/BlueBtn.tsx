import React from 'react';
import styled from 'styled-components';

const Btn = styled.button<Button>`
  width: ${({ width }): string => width};
  height: ${({ height }): string | undefined => height};
  background-color: #0069ca;
  color: #fff;
  box-sizing: border-box;
  cursor: pointer;
`;

interface Props {
  content: string;
  width: string;
  height?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

interface Button {
  width: string;
  height?: string;
}

const BlueBtn: React.FC<Props> = ({
  content,
  width,
  height,
  onClick,
}: Props) => {
  return (
    <>
      <Btn width={width} height={height} onClick={onClick}>
        {content}
      </Btn>
    </>
  );
};

export default BlueBtn;
