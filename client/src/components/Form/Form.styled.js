import styled from 'styled-components';

export const FormContainer = styled.form`
  display: grid;
  grid-template-columns: ${({ columns }) => (columns === 2 ? 'repeat(2, 1fr)' : '1fr')};
  gap: 1rem;
  margin: 20px 10px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  &.error {
    border-bottom-color: ${({ theme }) => theme.text.error};
  }
  &:focus {
    border-color: ${({ theme }) => theme.background.accent};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.background.accent};
    outline: none;
  }
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  grid-column: 1 / -1;
  margin: 0 -10px;
`;

export const Issue = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text.error};
  margin: 3px 0 0 0;
`;

export const PillCheckbox = styled.span`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
  background-color: ${(props) => (props.checked ? '#4CAF50' : '#ccc')};
  border-radius: 25px;
  transition: background-color 0.2s;
  cursor: pointer;
  &:before {
    content: '';
    position: absolute;
    top: 2px;
    left: ${(props) => (props.checked ? '25px' : '2px')};
    width: 21px;
    height: 21px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.2s;
  }
`;
