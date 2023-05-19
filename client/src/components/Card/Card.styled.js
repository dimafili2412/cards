import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';

export const StyledCard = styled.div`
  display: inline-flex;
  flex-flow: column;
  width: 300px;
  height: 400px;
  margin: 5px;
  border-radius: 5px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  background-color: ${({ theme }) => theme.background.secondary};
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
`;

export const Header = styled.div`
  padding: 10px;
`;

export const Title = styled.h2`
  font-family: 'Roboto', sans-serif;
  margin: 0 0 3px 0;
`;

export const Subtitle = styled.h4`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
`;

export const Divider = styled.hr`
  margin: 0 10px;
`;

export const Body = styled.div`
  margin: 10px 10px 0 10px;
  font-family: 'Open Sans', sans-serif;
  font-size: 0.9rem;
  ul {
    list-style-type: none;
  }
`;

export const Footer = styled.div`
  margin: auto 0 0 0;
  display: flex;
  padding: 0 5px;
  div {
    display: inline-block;
    margin-left: auto;
  }
  svg {
    margin: 5px;
    cursor: pointer;
    color: ${({ theme }) => theme.text.secondary};
    &:hover {
      color: ${({ theme }) => theme.textActive.secondary};
    }
    &.favorite {
      color: ${({ theme }) => theme.text.error};
      &:hover {
        filter: brightness(0.7);
      }
    }
  }
`;

export const AddIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 7rem;
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.textActive.primary};
    }
  }
`;
