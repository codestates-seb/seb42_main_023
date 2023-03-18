import React from 'react';
import styled from 'styled-components';
import { SidebarBtn } from '../common/Btn';
function Sidebar() {
  const options = [
    { option: '작성한 글', number: 4 },
    { option: '작성한 댓글', number: 5 },
    { option: '좋아요한 글', number: 2 },
    { option: '좋아요한 댓글', number: 6 },
    { option: '북마크', number: 4 },
  ];
  return (
    <Nav>
      {options.map((option) => (
        <SidebarBtn key={option.option}>
          <span>{option.option}</span>
          <div>{option.number}</div>
        </SidebarBtn>
      ))}
    </Nav>
  );
}

export default Sidebar;
const Nav = styled.nav`
  box-sizing: border-box;
  width: 200px;
  padding: 8px;
  margin-right: 8px;
  border: 1px solid var(--border-color);
  display: inline;
`;
