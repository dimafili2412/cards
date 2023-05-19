import React, { useState, useEffect } from 'react';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';
import DarkModeButton from './DarkModeButton';
import User from './User';
import MenuIcon from '@mui/icons-material/Menu';
import { StyledLink } from './styledLink';
import NavBar from './NavBar';
import styled from 'styled-components';

const Spacer = styled.div`
  width: 100%;
`;

const NavDrawer = styled.div`
  position: absolute;
  top: 3rem;
  left: 0;
  background-color: ${({ theme }) => theme.background.accent};
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-bottom-right-radius: 5px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
  width: fit-content;
  transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(-120%)')};
  transition: transform 0.3s ease-in-out;
  z-index: -1;
`;

const NavMobile = () => {
  const [open, setOpen] = useState(false);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };
  const handleCloseDrawer = () => {
    setOpen(false);
  };
  useEffect(() => {
    document.addEventListener('click', handleCloseDrawer);
    return () => {
      document.removeEventListener('click', handleCloseDrawer);
    };
  }, []);

  return (
    <NavBar>
      <StyledLink onClick={handleMenuClick}>
        <MenuIcon />
      </StyledLink>
      <NavDrawer open={open} onClick={(e) => e.stopPropagation()}>
        <div>
          <SearchBar />
        </div>
        <NavLinks mobile={true} onClick={handleCloseDrawer} />
      </NavDrawer>
      <Spacer />
      <DarkModeButton />
      <User />
    </NavBar>
  );
};

export default NavMobile;
