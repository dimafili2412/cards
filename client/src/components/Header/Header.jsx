import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectBreakpoints } from '../../features/theme/themeSlice.js';
import { selectWindowSize } from '../../features/window/windowSlice.js';
import NavDesktop from './NavDesktop.jsx';
import NavMobile from './NavMobile.jsx';

const StyledHeader = styled.header`
  width: 100%;
  height: 3rem;
  background-color: ${({ theme }) => theme.background.accent};
  color: ${({ theme }) => theme.text.accent};
  box-shadow: 0 0px 5px 2px rgba(0, 0, 0, 0.5);
  font-family: 'Roboto', sans-serif;
`;

const Header = () => {
  const breakpoints = useSelector(selectBreakpoints);
  const windowSize = useSelector(selectWindowSize);
  //for some cosmic reson it doesn't update on chrome mobile switch - but works wonders when resized or intially launched in mobile / dt sizes
  return <StyledHeader>{windowSize.width <= breakpoints.tablet ? <NavMobile /> : <NavDesktop />}</StyledHeader>;
};

export default Header;
