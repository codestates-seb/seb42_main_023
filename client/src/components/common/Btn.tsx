import React from 'react';
import styled from 'styled-components';

export const BlueBtn = styled.button`
  background-color: var(--point-blue-color);
  color: var(--point-font-color);
  box-sizing: border-box;
  cursor: pointer;
  :hover {
    transition: 0.3s;
    background-color: var(--hover-point-blue-color);
  }
`;
export const WhiteBtn = styled.button`
  border: 1px solid var(--border-color);
  box-sizing: border-box;
  cursor: pointer;
  :hover {
    background-color: #f9f6f6;
    color: var(--hover-font-gray-color);
  }
`;
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
export const ClickSearchBtn = styled(SearchBtn)`
  background-color: #fff;
  color: #000;
  :hover {
    background-color: var(--hover-button-color);
    color: var(--hover-font-gray-color);
  }
`;

export const NavBtn = styled.button`
  background-color: #fff;
  cursor: pointer;
  :hover {
    color: var(--point-blue-color);
    transition: 0.3s;
  }
`;

export const NavBtnClicked = styled(NavBtn)`
  border-bottom: 1px solid var(--point-blue-color);
  color: var(--point-blue-color);
`;
