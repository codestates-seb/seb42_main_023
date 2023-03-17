import React from 'react';
import styled from 'styled-components';

export const BlueBtn = styled.button`
  background-color: #0069ca;
  color: #fff;
  box-sizing: border-box;
  cursor: pointer;
  :hover {
    transition: 0.3s;
    background-color: #0275e1;
    color: #fff;
  }
`;
export const WhiteBtn = styled.button`
  background-color: #fff;
  border: 1px solid #d4d4d4;
  box-sizing: border-box;
  cursor: pointer;
  :hover {
    background-color: #f9f6f6;
    color: #5c5c5c;
  }
`;
export const SearchBtn = styled.button`
  padding: 6px 20px;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  background-color: #0069ca;
  color: #fff;
  :hover {
    transition: 0.3s;
    background-color: #0275e1;
    color: #fff;
  }
`;
export const ClickSearchBtn = styled(SearchBtn)`
  background-color: #fff;
  color: #000;
  :hover {
    background-color: #f9f6f6;
    color: #5c5c5c;
  }
`;
