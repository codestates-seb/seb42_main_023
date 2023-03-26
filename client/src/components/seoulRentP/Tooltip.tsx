import React, { useState } from 'react';
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
  //   const [tooltipData, setTooltipData] = useState(null);
  return (
    <TooltipWrap left={x} top={y}>
      <div>test</div>
    </TooltipWrap>
  );
};

export default Tooltip;

const TooltipWrap = styled.div<StyleProps>`
  position: absolute;
  background-color: white;
  border: 1px solid black;
  width: 100px;
  height: 100px;
  padding: 10px;
  left: ${({ left }) => left};
  top: ${({ top }) => top};
`;
