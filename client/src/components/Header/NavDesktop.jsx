import React from 'react';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';
import DarkModeButton from './DarkModeButton';
import User from './User';
import NavBar from './NavBar';

const NavDesktop = () => {
  return (
    <NavBar>
      <NavLinks />
      <SearchBar />
      <DarkModeButton />
      <User />
    </NavBar>
  );
};

export default NavDesktop;
