import React from 'react';
import styled from 'styled-components';
import { MainContainer } from './RecommendLoan';
import NavRealEstate from '../components/common/NavRealEstate';
import Seoulmap from '../assets/Seoulmap.png';
// import './style.css';
// import { MapAreas, Map } from 'react-img-mapper/dist/types';

// export interface Maptype {
//   id?: string;
//   shape: string;
//   coords: []; // <== Problem from react-img-mapper
//   active: boolean;
//   disabled: boolean;
//   href: string;
//   fillColor: string;
//   strokeColor: string;
//   lineWidth: number;
//   preFillColor: string;
// }
// type Map = {
//   name: string;
//   areas: Array<MapAreas>;
// }

function SeoulRent() {
  // const AREAS_MAP: MapAreas = {
  //   name: 'mymap',
  //   areas: [
  //     {
  //       id: 'two',
  //       shape: 'circle',
  //       coords: [185, 680, 117],
  //       preFillColor: 'red',
  //       fillColor: 'blue',
  //       active: false,
  //       strokeColor: 'red',
  //       disabled: false,
  //       href: 'href',
  //       lineWidth: 1,
  //     },
  //   ],
  // };
  return (
    <div>
      서울
      {/* <ImageMapper src={img} map={AREAS_MAP} /> */}
    </div>
  );
}

export default SeoulRent;
// const MainContent = styled(MainContainer)`
//   .content-container {
//     background-color: #fff;
//   }
// `;
