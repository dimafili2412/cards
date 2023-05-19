import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);
  z-index: 10;
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
  padding: 20px;
  background-color: ${({ theme }) => theme.background.secondary};
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

export const Title = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  margin: 5px 0 10px 0;
`;

export const Body = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  margin: 5px 0 15px 0;
`;

export const ButtonsContainer = styled.div`
  display: flex;
`;
