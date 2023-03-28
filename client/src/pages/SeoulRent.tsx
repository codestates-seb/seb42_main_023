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
  // 데이터 api
  const seoulrentquery = seoulrentApi.useGetSeoulRentListQuery({
    query: '',
  });
  const { data, isSuccess } = seoulrentquery;

  //툴팁 위치정보 저장
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  //클릭한 지역정보
  const [clickedArea, setClickedArea] = useState('');
  //클릭한 지역 월세
  const [monthlyRent, setMonthlyRent] = useState('');
  //클릭한 지역 전세
  const [diposit, setDiposit] = useState('');
  //행복주택
  const [happyHouse, setHappyHouse] = useState('');

  const moveOnArea = (area: CustomArea, evt: AreaEvent) => {
    const coords = { x: evt.nativeEvent.clientX, y: evt.nativeEvent.clientY };
    setClickedArea(area.id as string);
    setTooltipPosition(coords);
    const dataItem = data?.locationList.find(
      (el: Seoulrent) => el.location === area.id,
    );
    setMonthlyRent(dataItem?.monthlyRent?.averageMonthlyFee ?? '');
    setDiposit(dataItem?.jeonse?.averageDeposit ?? '');
    setHappyHouse(dataItem?.happyHouse);
  };

  if (!isSuccess) {
    return <div>loading...</div>;
  }

  return (
    <MainContent>
      <NavRealEstate />
      <div className="content-container">
        <h1>서울 전월세 평균 데이터</h1>
        <Mention className="mention">
          연립주택,오피스텔,단독다세대 주택을 기준으로 평수에 상관없이 수집한
          데이터입니다.
        </Mention>
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
              {diposit}
            </div>
            <div className="lastdiv">
              <span>월세 </span>
              {monthlyRent}
            </div>
            {happyHouse ? (
              <div>
                <Link className="link" to="/happyhouse">
                  {'행복주택'}
                </Link>
              </div>
            ) : (
              <div>공고없음</div>
            )}
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
    flex-direction: column;
    padding: 30px;
    border: none;
    h1 {
      font-size: 20px;
    }
  }
`;

const Mention = styled.span`
  font-size: 12px;
  margin-left: 4px;
  color: var(--sub-font-color);
  padding-bottom: 40px;
`;
const TooltipWrap = styled.div<StyleProps>`
  position: absolute;
  background-color: #fff;
  border: 1px solid var(--border-color);
  width: 140px;
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
