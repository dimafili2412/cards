import React from 'react';
import styled from 'styled-components';

const NavBarWrapper = styled.div`
  position: relative;
  z-index: 30;
  height: 100%;
`;

const StyledNavBar = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.background.accent};
`;

const NavBar = ({ children }) => {
  return (
    <NavBarWrapper>
      <StyledNavBar>{children}</StyledNavBar>
    </NavBarWrapper>
  );
};

export default NavBar;
