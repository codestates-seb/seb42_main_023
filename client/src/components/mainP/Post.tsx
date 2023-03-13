import React from 'react';
import styled from 'styled-components';
import LikeIcon from '../../assets/common/LikeIcon';
import TimeIcon from '../../assets/common/TimeIcon';
import ViewIcon from '../../assets/common/ViewIcon';
import Tag from '../common/Tag.js';
import Thumnail from './Thumnail';

interface Props {
  img: string;
  title: string;
  tag: string[];
  writer_id: string;
  createdAt: string;
  modified_at: string;
  view_count: number;
}

const Post: React.FC = (
  {
    // img,
    // title,
    // tag,
    // writer_id,
    // createdAt,
    // modified_at,
    // view_count,
  },
) => {
  return (
    <Item>
      {/* <div>
        <Thumnail content={img} />
      </div>
      <div>
        <h1>{title}</h1>
        <Itemside>
          <Taglist>
            {tag.map((el) => (
              <Tag content={el} />
            ))}
          </Taglist>
          <Info>
            <span>{writer_id}</span>
            <span>
              <TimeIcon />
              {createdAt}
            </span>
            <span>
              <ViewIcon />
              {view_count}
            </span>
            <span>
              <LikeIcon checked={false} />
              10
            </span>
          </Info>
        </Itemside>
      </div> */}
    </Item>
  );
};

export default Post;

const Item = styled.li`
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
