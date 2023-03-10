import React from 'react';
import styled from 'styled-components';
import LikeIcon from '../../assets/common/LikeIcon';
import TimeIcon from '../../assets/common/TimeIcon';
import ViewIcon from '../../assets/common/ViewIcon';

const Item = styled.div`
  height: 100px;
  border: 1px solid #000;
  box-sizing: border-box;
  h1 {
    font-size: 20px;
  }
`;
function Post() {
  return (
    <Item>
      <h1>제목</h1>
      <div>
        <div>
          <span>광고</span>
        </div>
        <div>
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
        </div>
      </div>
    </Item>
  );
}

export default Post;
