import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllCards } from '../features/cards/cardsSlice';
import CardsContainer from '../components/CardsContainer/CardsContainer';
import Card from '../components/Card/Card';
import PageTitle from '../components/PageTitle/PageTitle';

const ManageCards = () => {
  const cards = useSelector(selectAllCards);
  return (
    <div>
      <PageTitle title="Manage Cards" subtitle="Admin panel for managing all cards" />
      <CardsContainer>
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </CardsContainer>
    </div>
  );
};

export default ManageCards;
