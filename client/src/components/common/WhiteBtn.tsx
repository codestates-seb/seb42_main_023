import React from 'react';
import styled from 'styled-components';

const Btn = styled.button<Button>`
  width: ${({ width }): string => width};
  height: ${({ height }): string | undefined => height};
  background-color: #fff;
  border: 1px solid #d4d4d4;
  box-sizing: border-box;
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

const WhiteBtn: React.FC<Props> = ({
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

export default WhiteBtn;
