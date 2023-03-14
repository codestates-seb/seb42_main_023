import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AiFillGithub, AiFillYoutube } from 'react-icons/ai';
import { RxNotionLogo } from 'react-icons/rx';

const Head = styled.header``;

function HeaderDefault() {
  return (
    <Head>
      <img></img>
      <span>집구하기</span>
      <span>뜨는주식</span>
      <span>세금계산기</span>
    </Head>
  );
}

export default HeaderDefault;
