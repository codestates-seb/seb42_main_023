import React from 'react';
import NextPageIcon from '../assets/common/NextPageIcon';
import PrevPageIcon from '../assets/common/PrevPageIcon';
import PostList from '../components/mainP/PostList';
import { useSelector, useDispatch } from 'react-redux';
import { getlist } from '../slices/postSlice';
import axios from 'axios';
import { useEffect } from 'react';

function Main() {
  // interface Post {
  //   img: string;
  //   title: string;
  //   tag: string[];
  //   writer_id: string;
  //   createdAt: string;
  //   modified_at: string;
  //   view_count: number;
  //   thumbup: number;
  // }
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.postlist;
  });

  useEffect(() => {
    axios
      .get(
        'https://main-project-d9049-default-rtdb.asia-southeast1.firebasedatabase.app/POST.json',
      )
      .then((response) => {
        dispatch(getlist(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
