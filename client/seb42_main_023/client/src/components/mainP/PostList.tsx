import React from 'react';
import Post from './Post';
import axios from 'axios';
import { useEffect, useState } from 'react';
import type { PostItem } from './Post';

function PostList() {
  const [data, setData] = useState<PostItem[]>([]);

  useEffect(() => {
    //post list 불러오기
    axios
      .get(
        'https://main-project-d9049-default-rtdb.asia-southeast1.firebasedatabase.app/POST.json',
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <ul>
      {data &&
        data.map((post) => {
          //key값 이후에 수정하기
          return <Post key={post.writer_id} post={post} />;
        })}
    </ul>
  );
}

export default PostList;
