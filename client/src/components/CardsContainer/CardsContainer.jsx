import React from 'react';
import styled from 'styled-components';

const StyledCardsContainer = styled.div`
  margin: 20px 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const CardsContainer = ({ children }) => {
  return <StyledCardsContainer>{children}</StyledCardsContainer>;
};

export default CardsContainer;
