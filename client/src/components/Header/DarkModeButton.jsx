import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { toggleTheme } from '../../features/theme/themeSlice';
import { selectTheme } from '../../features/theme/themeSlice';

const StyledDarkModeButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 5px;
  margin: 0 10px 0 0;
  //hardcoded colors (reason is quite obvious)
  .dark-mode-icon {
    color: black;
  }
  .light-mode-icon {
    color: white;
  }
`;

const DarkModeButton = () => {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(toggleTheme());
  };
  return (
    <StyledDarkModeButton onClick={handleClick}>
      {theme === 'light' ? <DarkModeIcon className="dark-mode-icon" /> : <LightModeIcon className="light-mode-icon" />}
    </StyledDarkModeButton>
  );
};

export default DarkModeButton;
