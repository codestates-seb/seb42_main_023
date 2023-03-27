import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MainContainer } from './RecommendLoan';
import NavRealEstate from '../components/common/NavRealEstate';
import Seoulmap from '../assets/mapbg.svg';
import { AREAS_MAP, Seoulrent } from '../../src/components/seoulRentP/map';
import ImageMapper from 'react-img-mapper';
import { CustomArea, AreaEvent } from 'react-img-mapper/dist/types';
import { seoulrentApi } from '../api/seoulrentApi';
import { Link } from 'react-router-dom';
interface StyleProps {
  left: number;
  top: number;
}
function SeoulRent() {
  const seoulrentquery = seoulrentApi.useGetSeoulRentListQuery({
    query: '',
  });
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const { data, isSuccess } = seoulrentquery;
  // const [x, setX] = useState(0);
  // const [y, setY] = useState(0);
  const [clickedArea, setClickedArea] = useState('');
  const [msg, setMsg] = useState('');

  // useEffect(() => {
  //   console.log(x, y, clickedArea + 'text');
  // }, [x, y]);

  const moveOnArea = (area: CustomArea, evt: AreaEvent) => {
    const coords = { x: evt.nativeEvent.clientX, y: evt.nativeEvent.clientY };
    console.log(
      `You moved on ${area.shape} ${area.id} at coords ${JSON.stringify(
        coords,
      )} !`,
    );
    setTooltipPosition(coords);
    // setX(coords.x);
    // setY(coords.y);
    setClickedArea(area.id as string);
  };
  return (
    <MainContent>
      <NavRealEstate />
      <div className="content-container">
        <ImageMapper
          src={Seoulmap}
          map={AREAS_MAP}
          width={730}
          height={530}
          onMouseUp={(area, _, evt) => moveOnArea(area, evt)}
        />
        {clickedArea && (
          <TooltipWrap left={tooltipPosition.x} top={tooltipPosition.y}>
            <div>{clickedArea}</div>
            <div>
              <span>전세 </span>
              {}
            </div>
            <div className="lastdiv">
              <span>월세 </span>
              {}
            </div>
            <div>
              <Link className="link" to="/happyhouse">
                {'행복주택'}
              </Link>
            </div>
          </TooltipWrap>
        )}
      </div>
    </MainContent>
  );
}

export default SeoulRent;
const MainContent = styled(MainContainer)`
  .content-container {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
  }
`;
const TooltipWrap = styled.div<StyleProps>`
  position: absolute;
  background-color: #fff;
  border: 1px solid var(--border-color);
  width: 120px;
  height: 124px;
  padding: 14px;
  border-radius: 10px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.15);

  left: ${(props) => props.left - 46}px;
  top: ${(props) => props.top - 60}px;
  z-index: 99;
  .link {
    display: block;
    height: 20px;
    :hover {
      color: var(--point-blue-color);
    }
  }
  span {
    color: var(--point-blue-color);
  }
  div {
    margin-bottom: 4px;
  }
`;
