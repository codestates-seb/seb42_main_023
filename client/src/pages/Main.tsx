import React from 'react';
import NextPageIcon from '../assets/common/NextPageIcon';
import PrevPageIcon from '../assets/common/PrevPageIcon';
import Tag from '../components/common/Tag';
import PostList from '../components/mainP/PostList';

function Main() {
  return (
    <>
      {console.log('render')}
      <PostList />
      <Tag content="content" />
      <Tag content="content2" />
      <NextPageIcon />
      <PrevPageIcon />
    </>
  );
}

export default Main;
