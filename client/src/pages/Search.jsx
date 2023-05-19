import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectSearchTerm, selectFilteredCards } from '../features/cards/cardsSlice';
import PageTitle from '../components/PageTitle/PageTitle';
import CardsContainer from '../components/CardsContainer/CardsContainer';
import Card from '../components/Card/Card';

const EmptySearch = styled.h2`
  margin: 0 20px;
  font-family: 'Open Sans', sans-serif;
`;

const Search = () => {
  const searchTerm = useSelector(selectSearchTerm);
  const cards = useSelector(selectFilteredCards);
  return (
    <div>
      <PageTitle title="Search Results" subtitle={searchTerm} backButton={true} />
      <CardsContainer>
        {cards.map((card) => (
          <Card card={card} key={card.id} />
        ))}
      </CardsContainer>
      {cards && !cards.length ? <EmptySearch>There are no cards matching your search.</EmptySearch> : null}
    </div>
  );
};

export default Search;
