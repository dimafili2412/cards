import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { StyledFooter, NavIcon } from './Footer.styled';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';

const Footer = () => {
  const user = useSelector(selectUser);
  const showFavorites = () => {
    if (user) return true;
  };
  const showMyCards = () => {
    if (user && user.business) return true;
  };
  return (
    <StyledFooter>
      <NavIcon to="/about">
        <InfoIcon />
        <span>Info</span>
      </NavIcon>
      {showFavorites() ? (
        <NavIcon to="/FavoriteCards">
          <FavoriteIcon />
          <span>Favorites</span>
        </NavIcon>
      ) : null}
      {showMyCards() ? (
        <NavIcon to="/MyCards">
          <DashboardCustomizeIcon />
          <span>My Cards</span>
        </NavIcon>
      ) : null}
    </StyledFooter>
  );
};

export default Footer;
