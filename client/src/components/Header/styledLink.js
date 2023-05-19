import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLink = styled(NavLink)`
  color: ${({ theme }) => theme.text.accent};
  text-decoration: none;
  margin: 0 10px;
  &:hover {
    color: ${({ theme }) => theme.textActive.accent};
  }
  strong {
    font-size: 2rem;
  }
  svg {
    font-size: 2.5rem;
  }
`;
