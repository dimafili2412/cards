import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TitleContainer = styled.div`
  margin: 10px 20px 0 20px;
  padding: 0 0 15px 0;
  border-bottom: 1px solid ${({ theme }) => theme.background.accent};
  font-family: 'Roboto', sans-serif;
`;

const Title = styled.h1`
  font-weight: 500;
`;

const Subtitle = styled.h4`
  font-weight: 400;
`;

const BackButton = styled(ArrowBackIcon)`
  color: ${({ theme }) => theme.text.primary};
  cursor: pointer;
  font-size: 3rem !important;
  margin: 0 10px 10px 0;
  &:hover {
    color: ${({ theme }) => theme.textActive.primary};
  }
`;

const PageTitle = ({ title, subtitle, backButton = false }) => {
  const navigate = useNavigate();
  return (
    <TitleContainer>
      <Title>
        {backButton ? <BackButton onClick={() => navigate(-1)} /> : null}
        {title}
      </Title>
      {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
    </TitleContainer>
  );
};

export default PageTitle;
