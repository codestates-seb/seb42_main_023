import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxDotFilled } from 'react-icons/rx';
const NavAdmin: React.FC = () => {
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState<number>(1);

  useEffect(() => {
    switch (window.location.pathname) {
      case '/reports/standby':
        setCurrentTab(0);
        break;
      case '/reports/deleted':
        setCurrentTab(1);
        break;
      default:
        setCurrentTab(1);
        break;
    }
  }, []);

  return (
    <Container>
      <div>
        <span>
          <RxDotFilled /> 게시판 관리
        </span>
        <ul>
          <li
            className={currentTab === 0 ? 'current' : ''}
            onClick={(): void => {
              navigate('/reports/standby');
            }}
          >
            미처리 신고글
          </li>
          <li
            className={currentTab === 1 ? 'current' : ''}
            onClick={(): void => {
              navigate('/reports/deleted');
            }}
          >
            처리된 신고글
          </li>
        </ul>
      </div>
      <div>
        <span>
          <RxDotFilled />
          고객 관리
        </span>
        <ul>
          <li>회원 조회</li>
          <li>회원 차단</li>
        </ul>
      </div>
      <div>
        <span>
          <RxDotFilled />
          운영자 설정
        </span>
        <ul>
          <li>운영자 등록</li>
        </ul>
      </div>
    </Container>
  );
};

export default NavAdmin;

const Container = styled.nav`
  width: 140px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    width: 110px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--border-color);
    > ul {
      margin-top: 10px;
      margin-bottom: 20px;
      > li {
        font-size: 14px;
        margin-left: 15px;
        margin-bottom: 10px;
        cursor: pointer;
      }
      > .current {
        color: var(--point-blue-color);
      }
    }
  }
`;
