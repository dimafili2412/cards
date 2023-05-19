import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
  height: 100%;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 70%;
  max-width: 55rem;
  background: ${({ theme }) => theme.background.secondary};
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
  @media only screen and (max-width: ${({ breakpoint }) => `${breakpoint}px`}) {
    width: 95%;
    padding: 10px;
  }
`;

export const InfoItem = styled.div`
  margin: 15px 0;
  font-size: 18px;
  color: ${({ theme }) => theme.text.secondary};
  line-height: 1.6;
  border-bottom: 1px solid ${({ theme }) => theme.background.accent};
  width: 100%;
  span {
    display: inline-block;
    font-weight: bold;
    width: 10rem;
    @media only screen and (max-width: ${({ breakpoint }) => `${breakpoint}px`}) {
      display: block;
    }
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 30px 0 0 0;
  button {
    max-width: 20rem;
  }
`;
