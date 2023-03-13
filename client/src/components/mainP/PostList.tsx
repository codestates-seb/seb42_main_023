import React from 'react';
import Post from './Post';
import axios from 'axios';
import { useEffect, useState } from 'react';
import type { PostItem, Tags } from './Post';

function PostList() {
  const [data, setData] = useState<PostItem[]>([]);

  useEffect(() => {
    //post list 불러오기
    axios
      .get(
        'https://main-project-d9049-default-rtdb.asia-southeast1.firebasedatabase.app/POST.json',
      )
      .then((response) => {
        console.log(response.data);
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
          console.log(new Date(post.createdAt));
          return <Post key={post.writer_id} post={post} />;
        })}
    </ul>
  );
}

export default PostList;
