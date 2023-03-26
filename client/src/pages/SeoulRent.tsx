import React, { useState } from 'react';
import styled from 'styled-components';
import { MainContainer } from './RecommendLoan';
import NavRealEstate from '../components/common/NavRealEstate';
import Seoulmap from '../assets/mapbg.svg';
import { AREAS_MAP, Seoulrent } from '../../src/components/seoulRentP/map';
import ImageMapper from 'react-img-mapper';
import { CustomArea, AreaEvent } from 'react-img-mapper/dist/types';
import Tooltip from '../components/seoulRentP/Tooltip';

function SeoulRent() {
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [hoveredArea, setHoveredArea] = useState('');

  const enterArea = (area: CustomArea, e: AreaEvent) => {
    if (area.id !== undefined) {
      // const x = e.pageX;
      // const y = e.pageY;
      // setTooltipPosition({ x, y });
      // setHoveredArea(area.id);
      // console.log(hoveredArea);
    }
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
          onMouseEnter={(area, idx, e) => enterArea(area, e)}
          onMouseDown={(area, idx, e) => enterArea(area, e)}
        />
        {/* {hoveredArea && (
          <Tooltip
            x={tooltipPosition.x}
            y={tooltipPosition.y}
            location={hoveredArea}
          />
        )} */}
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
