import React from 'react';
import styled from 'styled-components';
import LikeIcon from '../../assets/common/LikeIcon';
import LoginBtn from '../common/LoginBtn';
import PostBtn from '../common/PostBtn';
import TimeIcon from '../../assets/common/TimeIcon';
import ViewIcon from '../../assets/common/ViewIcon';
import WhiteBtn from '../common/WhiteBtn';
import BlueBtn from '../common/BlueBtn';
import Tag from '../common/Tag';

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
      {/* <PostBtn />
      <LoginBtn />
      <BlueBtn
        content={'정의'}
        width={'300px'}
        height={'100px'}
        onClick={(): void => console.log('확인')}
      />
      <WhiteBtn
        content={'정의'}
        width={'300px'}
        height={'100px'}
        onClick={(): void => console.log('확인')}
      /> */}
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
    </Item>
  );
};

export default Post;
