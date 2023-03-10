import React from 'react';
import styled from 'styled-components';
import LikeIcon from '../../assets/common/LikeIcon';
import TimeIcon from '../../assets/common/TimeIcon';
import ViewIcon from '../../assets/common/ViewIcon';
import Tag from '../common/Tag';
import Thumnail from './Thumnail';

const Item = styled.div`
  height: 100px;
  border-bottom: 1px solid #d9d9d9;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 20px;
    margin-bottom: 4px;
  }
  > div:nth-child(2) {
    flex-grow: 1;
  }
`;
const Itemside = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  > div {
    display: flex;
  }
`;
const Taglist = styled.div``;
const Info = styled.div`
  span {
    font-size: 12px;
    margin-left: 20px;
    flex-direction: row;
    display: flex;
    align-items: center;
  }
`;

const Post: React.FC = () => {
  return (
    <Item>
      <div>
        <Thumnail content="https://demo.ycart.kr/shopboth_farm_max5_001/data/editor/1612/cd2f39a0598c81712450b871c218164f_1482469221_493.jpg" />
      </div>
      <div>
        <h1>제목</h1>
        <Itemside>
          <Taglist>
            <Tag content={'안녕'} />
            <Tag content={'안녕하세요'} />
            <Tag content={'안녕갑세요'} />
          </Taglist>
          <Info>
            <span>bunny</span>
            <span>
              <TimeIcon />
              12시간전
            </span>
            <span>
              <ViewIcon />
              200
            </span>
            <span>
              <LikeIcon checked={false} />
              10
            </span>
          </Info>
        </Itemside>
      </div>
    </Item>
  );
};

export default Post;
