import React from 'react';
import styled from 'styled-components';

const PageFormContainerStyled = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
`;

const PageFormContainer = ({ children }) => {
  return <PageFormContainerStyled>{children}</PageFormContainerStyled>;
};

export default PageFormContainer;
