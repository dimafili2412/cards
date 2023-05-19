import styled from 'styled-components';

export const AboutContainer = styled.div`
  display: grid;
  gap: 20px;
  padding: 40px;
  background-color: ${({ theme }) => theme.background.secondary};
  border-radius: 20px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  width: 90%;
  margin: 20px auto;
  h1,
  h2 {
    color: ${({ theme }) => theme.text.primary};
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    line-height: 1.2;
  }
  h1 {
    margin-bottom: 20px;
  }
  h2 {
    margin-bottom: 10px;
  }
  p,
  li {
    color: ${({ theme }) => theme.text.light};
    font-size: 18px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 200;
    line-height: 1.6;
  }
  li {
    margin-bottom: 10px;
    padding-left: 20px;
    list-style-type: none;
    position: relative;
    &:before {
      content: '✓';
      position: absolute;
      left: 0;
      color: ${({ theme }) => theme.background.accent};
    }
  }
`;
