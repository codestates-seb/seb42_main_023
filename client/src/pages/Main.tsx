import React from 'react';
import BookmarkIcon from '../assets/common/BookmarkIcon';
import CommentIcon from '../assets/common/CommentIcon';
import DislikeIcon from '../assets/common/DislikeIcon';
import LikeIcon from '../assets/common/LikeIcon';
import TimeIcon from '../assets/common/TimeIcon';
import ViewIcon from '../assets/common/ViewIcon';
import NextPageIcon from '../assets/common/NextPageIcon';
import PrevPageIcon from '../assets/common/PrevPageIcon';
import PostList from '../components/mainP/PostList';

function Main() {
  return (
    <>
      <PostList />
      <NextPageIcon />
      <PrevPageIcon />
      <LikeIcon />
      <DislikeIcon />
      <CommentIcon />
      <BookmarkIcon />
      <TimeIcon />
      <ViewIcon />
    </>
  );
}

export default Main;
