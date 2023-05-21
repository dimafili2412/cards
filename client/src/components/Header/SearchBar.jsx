import React, { useState } from 'react';
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
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const handleSearch = () => {
    dispatch(setSearchTerm(localSearchTerm));
    if (location.pathname !== '/search') {
      navigate('/search');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInput = (event) => {
    setLocalSearchTerm(event.target.value);
  };

  return (
    <SearchBarWrapper>
      <StyledInput type="text" placeholder="Search..." onKeyDown={handleKeyDown} onInput={handleInput} value={localSearchTerm} />
      <StyledSearchIcon onClick={handleSearch} />
    </SearchBarWrapper>
  );
};

export default SearchBar;
