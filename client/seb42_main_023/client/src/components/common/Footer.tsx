import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AiFillGithub, AiFillYoutube } from 'react-icons/ai';
import { RxNotionLogo } from 'react-icons/rx';

function Footer() {
  return (
    <Foot>
      <div>
        <a
          href="https://github.com/codestates-seb/seb42_main_023"
          target="_blank"
          rel="noreferrer"
        >
          <AiFillGithub size={24} />
        </a>
        <a href="#">
          <AiFillYoutube size={24} />
        </a>
        <a
          href="https://www.notion.so/codestates/9d636b91667a46d3bc704f32a65c2ef7"
          target="_blank"
          rel="noreferrer"
        >
          <RxNotionLogo size={24} />
        </a>
      </div>
      <div>Copyright© Digital Dragons Corp. All rights Reserved.</div>
    </Foot>
  );
}

export default Footer;
const Foot = styled.footer`
  background-color: #1f1f1f;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
  div {
    :nth-child(1) {
      a {
        margin-right: 26px;
        color: inherit;
        :hover {
          color: #c8c8c8;
          transition: 0.3s;
        }
      }
    }
    :nth-child(2) {
      font-size: 12px;
      margin-top: 12px;
      font-weight: 200;
    }
  }
`;
