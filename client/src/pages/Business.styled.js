import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px;
  @media only screen and (max-width: ${(props) => `${props.tabletBreakPoint}px` || '1000px'}) {
    flex-wrap: wrap;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0 20px 0;
  img {
    border-radius: 3px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    max-height: 400px;
    max-width: 90vw;
  }
`;

export const Description = styled.p`
  text-align: center;
  font-family: 'Roboto', sans-serif;
`;

export const Info = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-weight: 200;
  ul {
    list-style: none;
    li {
      margin: 10px 0;
      strong {
        display: inline-block;
        width: 5.5rem;
      }
    }
  }
`;
