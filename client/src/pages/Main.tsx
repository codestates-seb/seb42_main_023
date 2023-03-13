import React from 'react';
import NextPageIcon from '../assets/common/NextPageIcon';
import PrevPageIcon from '../assets/common/PrevPageIcon';
import PostList from '../components/mainP/PostList';

function Main() {
  return (
    <>
      {console.log('render')}
      <PostList />
      <NextPageIcon />
      <PrevPageIcon />
    </>
  );
}

export default Main;
