import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllCards, loadNumCards, loadFavoriteCards } from '../features/cards/cardsSlice';
import CardsContainer from '../components/CardsContainer/CardsContainer';
import Card from '../components/Card/Card';
import PageTitle from '../components/PageTitle/PageTitle';

const ManageCards = () => {
  const dispatch = useDispatch();
  const cards = useSelector(selectAllCards);
  useEffect(() => {
    dispatch(loadNumCards(-1));
  }, []);
  const handleCardDelete = () => {
    dispatch(loadNumCards(-1));
  };
  return (
    <div>
      <PageTitle title="Manage Cards" subtitle="Admin panel for managing all cards" />
      <CardsContainer>
        {cards.map((card) => (
          <Card key={card.id} card={card} onDelete={handleCardDelete} />
        ))}
      </CardsContainer>
    </div>
  );
};

export default ManageCards;
