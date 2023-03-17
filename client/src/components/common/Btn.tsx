import React from 'react';
import styled from 'styled-components';

export const BlueBtn = styled.button`
  background-color: var(--point-blue-color);
  color: var(--point-font-color);
  box-sizing: border-box;
  :hover {
    transition: 0.3s;
    background-color: var(--hover-point-blue-color);
  }
`;
export const WhiteBtn = styled.button`
  border: 1px solid var(--border-color);
  box-sizing: border-box;
  :hover {
    background-color: #f9f6f6;
    color: var(--hover-font-gray-color);
  }
`;
//검색하기 버튼
export const SearchBtn = styled.button`
  padding: 6px 20px;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  background-color: var(--point-blue-color);
  color: #fff;
  :hover {
    transition: 0.3s;
    background-color: var(--hover-point-blue-color);
  }
`;
//검색취소 버튼
export const ClickSearchBtn = styled(SearchBtn)`
  background-color: #fff;
  color: #000;
  :hover {
    background-color: var(--hover-button-color);
    color: var(--hover-font-gray-color);
  }
`;
//Header 집구하기, 뜨는주식, 세금계산기
export const NavBtn = styled.button`
  background-color: #fff;
  :hover {
    color: var(--point-blue-color);
    transition: 0.3s;
  }
`;
//Header 집구하기, 뜨는주식, 세금계산기 중 현재 위치페이지
export const NavBtnClicked = styled(NavBtn)`
  border-bottom: 1px solid var(--point-blue-color);
  color: var(--point-blue-color);
`;
//Mypage 작성한글,작성댓글 ...
export const SidebarBtn = styled.button`
  width: 100%;
  padding: 10px;
  margin-bottom: 8px;
  border: 1px solid var(--border-color);
  transition: 0.3s;
  :hover {
    background-color: var(--hover-button-color);
  }
  span {
    color: var(--sub-font-color);
    font-size: 12px;
  }
`;
//아이콘svg를 감싸고 있는 버튼 검포넌트
export const IconBtn = styled.button`
  svg {
    :hover {
      color: var(--hover-font-gray-color);
    }
  }
`;
