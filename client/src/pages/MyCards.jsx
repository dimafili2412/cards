import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMyCards, loadMyCards } from '../features/cards/cardsSlice';
import PageTitle from '../components/PageTitle/PageTitle';
import CardsContainer from '../components/CardsContainer/CardsContainer';
import Card from '../components/Card/Card';

const MyCards = () => {
  const dispatch = useDispatch();
  const cards = useSelector(selectMyCards);
  useEffect(() => {
    dispatch(loadMyCards());
  }, []);
  return (
    <div>
      <PageTitle title="My Cards" />
      <CardsContainer>
        <Card newCard={true} />
        {cards.map((card) => (
          <Card card={card} key={card.id} onDelete={() => dispatch(loadMyCards())} />
        ))}
      </CardsContainer>
    </div>
  );
};

export default MyCards;
