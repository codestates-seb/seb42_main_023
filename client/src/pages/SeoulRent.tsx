import React, { useState } from 'react';
import styled from 'styled-components';
import { MainContainer } from './RecommendLoan';
import Seoulmap from '../assets/mapbg.svg';
import { AREAS_MAP, Seoulrent } from '../../src/components/seoulRentP/map';
import ImageMapper from 'react-img-mapper';
import { CustomArea, AreaEvent } from 'react-img-mapper/dist/types';
import { seoulrentApi } from '../api/seoulrentApi';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';

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
  const [jeonse, setJeonse] = useState('');
  //보증금
  const [diposit, setDiposit] = useState('');

  //1000단위 콤마표시
  function numberWithCommas(str: string): string {
    const num: number = parseInt(str.replace(/[^0-9]/g, ''), 10); // 숫자 이외의 문자 제거 후 정수형으로 변환
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 1000 단위로 콤마 추가
  }

  const moveOnArea = (area: CustomArea, evt: AreaEvent) => {
    const coords = { x: evt.nativeEvent.clientX, y: evt.nativeEvent.clientY };
    setClickedArea(area.id as string);
    setTooltipPosition(coords);
    const dataItem = data?.locationList.find(
      (el: Seoulrent) => el.location === area.id,
    );
    setMonthlyRent(dataItem?.monthlyRent?.averageMonthlyFee);
    setJeonse(dataItem?.jeonse?.averageDeposit);
    setDiposit(dataItem?.jeonse?.averageDeposit);
  };

  if (!isSuccess) {
    return <div>loading...</div>;
  }

  return (
    <MainContent>
      <h1>
        <AiFillHome size={26} />
        서울 전월세 평균 데이터
      </h1>
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
        stayHighlighted={true}
      />
      <Name className="1">강서구</Name>
      {clickedArea && (
        <TooltipWrap left={tooltipPosition.x} top={tooltipPosition.y}>
          <div>{clickedArea}</div>
          <div>
            <span>전세 </span>
            {jeonse}
          </div>
          <div>
            <span>월세 </span>
            {monthlyRent}
          </div>
          <div>
            <span>보증금 </span>
            {diposit}
          </div>
        </TooltipWrap>
      )}
    </MainContent>
  );
}
const Name = styled.span`
  position: absolute;
  z-index: 10;
`;

export default SeoulRent;
const MainContent = styled(MainContainer)`
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px;
  border-radius: 20px;
  border: 1px solid var(--border-color);
  h1 {
    font-size: 24px;
    svg {
      transform: translateY(4px);
      margin-right: 4px;
    }
  }
`;

const Mention = styled.span`
  font-size: 16px;
  margin-left: 4px;
  margin-top: 8px;
  color: var(--sub-font-color);
  padding-bottom: 70px;
  font-weight: 300;
`;
const TooltipWrap = styled.div<StyleProps>`
  position: absolute;
  background-color: #fff;
  border: 1px solid var(--border-color);
  width: 160px;
  height: 124px;
  padding: 14px;
  border-radius: 10px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.15);

  left: ${(props) => props.left - 46}px;
  top: ${(props) => props.top - 20}px;
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
