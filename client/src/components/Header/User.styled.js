import styled from 'styled-components';
import PersonIcon from '@mui/icons-material/Person';

export const UserContainer = styled.div`
  display: inline-block;
  width: fit-content;
  height: fit-content;
`;

export const UserIcon = styled(PersonIcon)`
  position: relative;
  margin: 0 10px 0 0;
  cursor: pointer;
  color: ${({ theme }) => theme.text.accent};
`;

export const UserMenu = styled.div`
  position: absolute;
  right: 0;
  top: 3rem;
  background-color: ${({ theme }) => theme.background.accent};
  padding: 15px 15px 5px 15px;
  border-bottom-left-radius: 5px;
  box-shadow: -2px 5px 10px rgba(0, 0, 0, 0.3);
  display: block;
  transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(-120%)')};
  transition: transform 0.3s ease-in-out;
  z-index: -1;

  ul {
    list-style: none;
    li {
      margin: 0 0 10px 0;
      cursor: pointer;
      &:hover {
        color: ${({ theme }) => theme.textActive.accent};
      }
    }
  }
`;
