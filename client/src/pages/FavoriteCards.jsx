import React from 'react';
import { useSelector } from 'react-redux';
import { selectFavoriteCards } from '../features/cards/cardsSlice';
import CardsContainer from '../components/CardsContainer/CardsContainer';
import Card from '../components/Card/Card';
import PageTitle from '../components/PageTitle/PageTitle';

const FavoriteCards = () => {
  const cards = useSelector(selectFavoriteCards);
  return (
    <div>
      <PageTitle title="Favorite Cards" />
      <CardsContainer>
        {cards.map((card) => (
          <Card card={card} key={card.id} disableCRUD={true} />
        ))}
      </CardsContainer>
    </div>
  );
};

export default FavoriteCards;
