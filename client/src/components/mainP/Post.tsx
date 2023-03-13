import React from 'react';
import styled from 'styled-components';
import LikeIcon from '../../assets/common/LikeIcon';
import TimeIcon from '../../assets/common/TimeIcon';
import ViewIcon from '../../assets/common/ViewIcon';
import Tag from '../common/Tag';
import Thumnail from './Thumnail';

export interface Tags {
  id: number;
  tag: string;
}
export interface PostItem {
  img: string;
  title: string;
  tag: Tags[];
  writer_id: string;
  createdAt: string;
  modified_at: string;
  view_count: number;
  thumbup: number;
}
type Props = {
  post: PostItem;
};

const Post = ({ post }: Props) => {
  //상대시간 계산기
  //시간차를 계산하여 밀리초로 바꿔주는 로직
  const getDateDiff = (date: string | Date): number => {
    const date1 = new Date();
    const date2 = new Date(date);
    const msDiff = date1.getTime() - date2.getTime();
    return Math.ceil(msDiff / 1000);
  };

  const timeSince = (date: string) => {
    const seconds = getDateDiff(date);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval + '년';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + '달';
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + '일';
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + '시간';
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + '분';
    }
    return '방금';
  };
  return (
    <Item>
      <div>
        <Thumnail content={post.img} />
      </div>
      <div>
        <h1>{post.title}</h1>
        <Itemside>
          <Taglist>
            {post.tag.map((tag) => (
              <Tag key={tag.id} content={tag.tag} button={'no'} />
            ))}
          </Taglist>
          <Info>
            <span>{post.writer_id}</span>
            <span>
              <TimeIcon />
              {timeSince(post.createdAt)}
            </span>
            <span>
              <ViewIcon />
              {post.view_count}
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
