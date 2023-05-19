import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledFooter = styled.footer`
  margin: auto 0 0 0;
  height: 3rem;
  width: 100%;
  background-color: ${({ theme }) => theme.background.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 50px;
  box-shadow: 0 0px 3px 1px rgba(0, 0, 0, 0.5);
`;

export const NavIcon = styled(NavLink)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text.light};
  &:hover {
    color: ${({ theme }) => theme.text.primary};
  }
`;
