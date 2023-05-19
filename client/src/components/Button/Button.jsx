import React from 'react';
import styled from 'styled-components';

export const StyledButton = styled.button`
  flex: 1;
  background-color: ${({ theme }) => theme.background.accent};
  color: ${({ theme }) => theme.text.accent};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin: 0 10px;
  &:hover {
    background-color: ${({ theme }) => theme.backgroundActive.accent};
    color: ${({ theme }) => theme.textActive.accent};
  }
`;

const Button = ({ onClick = () => {}, children }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
