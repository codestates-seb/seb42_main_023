import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import LoginBtn from './LoginBtn';

const Head = styled.header`
  border-bottom: 1px solid #d9d9d9;
  background-color: #fff;
  button {
    background-color: #fff;
    cursor: pointer;
    :first-child {
      margin-right: 10vw;
    }
  }
  div {
    max-width: 1100px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: inherit;
    justify-content: space-between;
    margin: 0 auto;
  }
  nav {
    button {
      margin-right: 10vw;
      :hover {
        color: #5c5c5c;
        transition: 0.3s;
      }
    }
  }
`;

function HeaderDefault() {
  const navigate = useNavigate();
  return (
    <Head>
      <div>
        <button onClick={() => navigate('/')}>
          <img src={Logo} height={30}></img>
        </button>
        <nav>
          <button onClick={() => navigate('/happyhouse')}>집구하기</button>
          <button onClick={() => navigate('/')}>뜨는주식</button>
          <button onClick={() => navigate('/')}>세금계산기</button>
        </nav>
        <LoginBtn />
      </div>
    </Head>
  );
}

export default HeaderDefault;
