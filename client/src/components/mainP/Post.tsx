import React from 'react';
import styled from 'styled-components';
import LikeIcon from '../../assets/common/LikeIcon';
import LoginBtn from '../../assets/common/LoginBtn';
import PostBtn from '../../assets/common/PostBtn';
import TimeIcon from '../../assets/common/TimeIcon';
import ViewIcon from '../../assets/common/ViewIcon';
import WhiteBtn from '../../assets/common/WhiteBtn';
import BlueBtn from '../../assets/common/BlueBtn';

const Item = styled.div`
  height: 100px;
  border: 1px solid #000;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 20px;
  }
  > div {
    display: flex;
    justify-content: space-between;
  }
`;
const Itemside = styled.div`
  div {
    display: flex;
    align-items: center;
  }
  span {
    font-size: 12px;
    color: #5c5c5c;
    margin-right: 20px;
    flex-direction: row;
    display: flex;
    align-items: center;
  }
`;

const Post: React.FC = () => {
  return (
    <Item>
      <PostBtn />
      <LoginBtn />
      <BlueBtn
        content={'정의'}
        width={'300px'}
        height={'100px'}
        onClick={(): void => console.log('확인')}
      />
      <WhiteBtn />
      {/* <h1>제목</h1>
      <Itemside>
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
      </Itemside> */}
    </Item>
  );
};

export default Post;
