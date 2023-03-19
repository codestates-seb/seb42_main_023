import React from 'react';
import styled from 'styled-components';
import { MainContainer } from './RecommendLoan';
import NavRealEstate from '../components/common/NavRealEstate';
import Seoulmap from '../assets/Seoulmap.png';

function SeoulRent() {
  return (
    <MainContent>
      <NavRealEstate />
      <div className="content-container">
        <img src={Seoulmap} width={700} useMap="#image-map"></img>
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
