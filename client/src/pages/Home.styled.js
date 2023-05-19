import styled from 'styled-components';

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 10px 20px 10px;
`;

export const ExpandCardsButton = styled.button`
  position: relative;
  display: inline-block;
  height: 2rem;
  width: 50%;
  max-width: 500px;
  background: transparent;
  overflow: hidden;
  color: ${({ theme }) => theme.text.accent};
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.background.accent};
  }
  &:hover {
    color: ${({ theme }) => theme.textActive.accent};
    &::after {
      filter: brightness(0.7);
    }
  }

  &:nth-child(1) {
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
  }
  &:nth-child(2) {
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
  }
`;
