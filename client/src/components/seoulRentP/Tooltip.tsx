import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  location: string;
  x: number;
  y: number;
}
interface StyleProps {
  left: number;
  top: number;
}

const Tooltip = ({ x, y, location }: Props) => {
  useEffect(() => {
    console.log(x, y, location + 'text');
  }, []);
  return (
    <TooltipWrap left={x} top={y}>
      <div>{location}</div>
    </TooltipWrap>
  );
};

export default Tooltip;

const TooltipWrap = styled.div<StyleProps>`
  position: absolute;
  background-color: blue;
  border: 1px solid black;
  width: 100px;
  height: 100px;
  padding: 10px;
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  z-index: 99;
`;
