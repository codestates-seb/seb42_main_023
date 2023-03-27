import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MainContainer } from './RecommendLoan';
import NavRealEstate from '../components/common/NavRealEstate';
import Seoulmap from '../assets/mapbg.svg';
import { AREAS_MAP, Seoulrent } from '../../src/components/seoulRentP/map';
import ImageMapper from 'react-img-mapper';
import { CustomArea, AreaEvent } from 'react-img-mapper/dist/types';
import Tooltip from '../components/seoulRentP/Tooltip';
import { seoulrentApi } from '../api/seoulrentApi';
interface StyleProps {
  left: number;
  top: number;
}
function SeoulRent() {
  const seoulrentquery = seoulrentApi.useGetSeoulRentListQuery({
    query: '',
  });
  const { data, isSuccess } = seoulrentquery;
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [clickedArea, setClickedArea] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    console.log(x, y, clickedArea + 'text');
  }, [x, y]);

  const moveOnArea = (area: CustomArea, evt: AreaEvent) => {
    const coords = { x: evt.nativeEvent.clientX, y: evt.nativeEvent.clientY };
    console.log(
      `You moved on ${area.shape} ${area.id} at coords ${JSON.stringify(
        coords,
      )} !`,
    );
    setX(coords['x']);
    setY(coords['Y']);
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
          <TooltipWrap left={x} top={y}>
            <div>{clickedArea}</div>
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
  background-color: blue;
  border: 1px solid black;
  width: 100px;
  height: 100px;
  padding: 10px;
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  z-index: 99;
`;
