import React from 'react';
import styled from 'styled-components';
import { BsDot } from 'react-icons/bs';
const RecommendedPost = () => {
  return (
    <RecommendedPostContainer>
      <ul>
        <li>
          <p>
            <BsDot></BsDot>인터넷으로 돈버는 25가지 방법을 가르쳐드립니다.
          </p>
        </li>
        <li>
          <p>
            <BsDot></BsDot>인터넷으로 돈버는 25가지 방법을 가르쳐드립니다.
          </p>
        </li>
        <li>
          <p>
            <BsDot></BsDot>인터넷으로 돈버는 25가지 방법을 가르쳐드립니다.
          </p>
        </li>
        <li>
          <p>
            <BsDot></BsDot>인터넷으로 돈버는 25가지 방법을 가르쳐드립니다.
          </p>
        </li>
        <li>
          <p>
            <BsDot></BsDot>인터넷으로 돈버는 25가지 방법을 가르쳐드립니다.
          </p>
        </li>
        <li>
          <p>
            <BsDot></BsDot>인터넷으로 돈버는 25가지 방법을 가르쳐드립니다.
          </p>
        </li>
        <li>
          <p>
            <BsDot></BsDot>인터넷으로 돈버는 25가지 방법을 가르쳐드립니다.
          </p>
        </li>
        <li>
          <p>
            <BsDot></BsDot>인터넷으로 돈버는 25가지 방법을 가르쳐드립니다.
          </p>
        </li>
        <li>
          <p>
            <BsDot></BsDot>인터넷으로 돈버는 25가지 방법을 가르쳐드립니다.
          </p>
        </li>
        <li>
          <p>
            <BsDot></BsDot>인터넷으로 돈버는 25가지 방법을 가르쳐드립니다.
          </p>
        </li>
      </ul>
    </RecommendedPostContainer>
  );
};

export default RecommendedPost;

const RecommendedPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  li p {
    margin: 15px 0 15px 0;
    width: 250px;
    font-size: 19px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
  }
`;
