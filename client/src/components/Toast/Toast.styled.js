import styled from 'styled-components';

export const ToastWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const ToastMessage = styled.div`
  background-color: ${({ theme, color }) => theme.background[color]};
  color: ${({ theme }) => theme.text.accent};
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  position: relative;
  padding: 15px 20px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.6);
  a {
    color: ${({ theme }) => theme.text.accent};
    &:visited {
      color: ${({ theme }) => theme.text.accent};
    }
    &:hover {
      color: ${({ theme }) => theme.textActive.accent};
    }
  }
`;

export const ExitButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.3rem;
  cursor: pointer;
  padding: 2px 5px;
  &:hover {
    color: ${({ theme }) => theme.textActive.accent};
    transform: scale(1.3);
  }
`;

export const ProgressBar = styled.div`
  height: 2px;
  background: #ffca28;
  width: ${(props) => props.width}%;
  transition: width linear 0.1s;
`;
