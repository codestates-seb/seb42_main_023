import React from 'react';
import styled from 'styled-components';
import { MainContainer } from './RecommendLoan';
import NavRealEstate from '../components/common/NavRealEstate';
import Seoulmap from '../assets/Seoulmap.png';
import { Map, MapAreas } from 'react-img-mapper/dist/types';
import ImageMapper from 'react-img-mapper/dist/types';

function SeoulRent() {
  const URL = 'https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg';
  const AREAS_MAP: Map = {
    name: 'my-map',
    areas: [
      {
        id: '1',
        shape: 'poly',
        coords: [25, 33, 27, 300, 128, 240, 128, 94],
        preFillColor: 'green',
        fillColor: 'blue',
      },
      {
        id: '2',
        shape: 'poly',
        coords: [219, 118, 220, 210, 283, 210, 284, 119],
        preFillColor: 'pink',
      },
      {
        id: '3',
        shape: 'poly',
        coords: [381, 241, 383, 94, 462, 53, 457, 282],
        fillColor: 'yellow',
      },
      {
        id: '4',
        shape: 'poly',
        coords: [245, 285, 290, 285, 274, 239, 249, 238],
        preFillColor: 'red',
      },
      { id: '5', shape: 'circle', coords: [170, 100, 25] },
    ],
  };
  return (
    <MainContent>
      <NavRealEstate />
      <div className="content-container">
        {/* <ImageMapper src={URL} map={AREAS_MAP} /> */}
      </div>
    </MainContent>
  );
}

export default SeoulRent;
const MainContent = styled(MainContainer)`
  .content-container {
    background-color: #fff;
  }
`;
