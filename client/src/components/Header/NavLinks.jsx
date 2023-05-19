import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';
import { StyledLink } from './styledLink';

const NavLinksContainer = styled.div`
  height: 100%;
  display: inline-flex;
  width: fit-content;
  align-items: center;
  flex-direction: ${({ mobile }) => (mobile ? 'column' : 'row')};
  a {
    ${({ mobile }) => (mobile ? 'width: 100%;' : '')}
    ${({ mobile }) => (mobile ? 'margin: 10px 0;' : '')}
  }
`;

const NavLinks = ({ onClick = () => {}, mobile = false }) => {
  const user = useSelector(selectUser);
  const showFavoriteCards = () => {
    if (user) {
      return true;
    }
    return false;
  };
  const showMyCards = () => {
    if (user) {
      if (user.business) {
        return true;
      }
    }
    return false;
  };
  const showManageCards = () => {
    if (user) {
      if (user.admin) {
        return true;
      }
    }
    return false;
  };
  const showManageUsers = () => {
    if (user) {
      if (user.admin) {
        return true;
      }
    }
    return false;
  };
  return (
    <NavLinksContainer mobile={mobile}>
      <StyledLink to="/" onClick={onClick}>
        <strong>BCHub</strong>
      </StyledLink>
      <StyledLink to="/About" onClick={onClick}>
        ABOUT
      </StyledLink>
      {showFavoriteCards() ? (
        <StyledLink to="/FavoriteCards" onClick={onClick}>
          FAVORITE CARDS
        </StyledLink>
      ) : null}
      {showMyCards() ? (
        <StyledLink to="/MyCards" onClick={onClick}>
          MY CARDS
        </StyledLink>
      ) : null}
      {showManageCards() ? (
        <StyledLink to="/ManageCards" onClick={onClick}>
          MANAGE CARDS
        </StyledLink>
      ) : null}
      {showManageUsers() ? (
        <StyledLink to="/ManageUsers" onClick={onClick}>
          MANAGE USERS
        </StyledLink>
      ) : null}
    </NavLinksContainer>
  );
};

export default NavLinks;
