import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { selectSearchTerm, setSearchTerm } from '../../features/cards/cardsSlice';

const SearchBarWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  padding: 3px;
  margin: 0 10px 0 auto;
  border-radius: 3px;
`;

const StyledInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  padding: 5px;
`;

const StyledSearchIcon = styled(SearchIcon)`
  color: ${({ theme }) => theme.text.primary};
  cursor: pointer;
  margin-right: 5px;
  &:hover {
    color: ${({ theme }) => theme.textActive.primary};
  }
`;

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchTerm = useSelector(selectSearchTerm);
  const handleSearch = () => {
    if (location.pathname !== '/Search') {
      navigate('/Search');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInput = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <SearchBarWrapper>
      <StyledInput type="text" placeholder="Search..." onKeyDown={handleKeyDown} value={searchTerm} onInput={handleInput} />
      <StyledSearchIcon onClick={handleSearch} />
    </SearchBarWrapper>
  );
};

export default SearchBar;
