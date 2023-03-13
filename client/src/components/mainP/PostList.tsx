import React from 'react';
import Post from './Post';
import axios from 'axios';
import { useEffect, useState } from 'react';

function PostList() {
  interface Post {
    img: string;
    title: string;
    tag: string[];
    writer_id: string;
    createdAt: string;
    modified_at: string;
    view_count: number;
    thumbup: number;
  }

  const [data, setData] = useState([{}]:Post[]);

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
          <Post post={post} />;
        })}
    </ul>
  );
}

export default PostList;
