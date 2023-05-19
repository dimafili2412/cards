import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllCards, loadFavoriteCards, selectAllCards } from '../features/cards/cardsSlice';
import { ButtonsContainer } from './Home.styled';
import { selectUser } from '../features/user/userSlice';
import { selectWindowSize } from '../features/window/windowSlice';
import Card from '../components/Card/Card';
import CardsContainer from '../components/CardsContainer/CardsContainer';
import PageTitle from '../components/PageTitle/PageTitle';
import Button from '../components/Button/Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Home = () => {
  const dispatch = useDispatch();
  const windowSize = useSelector(selectWindowSize);
  const cards = useSelector(selectAllCards);
  const user = useSelector(selectUser);
  const [cardsInrow, setCardsInrow] = useState(Math.floor(windowSize.width / 315) > 3 ? Math.floor(windowSize.width / 315) : 3);
  const [rows, setRows] = useState(1);
  let cardsDiplayed = [];
  if (cards.length > 0) {
    for (let i = 0; i < cardsInrow * rows; i++) {
      if (cards[i]) {
        cardsDiplayed.push({ ...cards[i] });
      }
    }
  }

  const increaseRows = () => {
    if (rows * cardsInrow < cards.length) {
      setRows(rows + 1);
    }
  };

  const decreaseRows = () => {
    if (rows > 1) {
      setRows(rows - 1);
    }
  };

  useEffect(() => {
    dispatch(loadAllCards());
  }, []);

  useEffect(() => {
    setCardsInrow(Math.floor(windowSize.width / 315) > 3 ? Math.floor(windowSize.width / 315) : 3);
    if (cardsInrow * rows > cards.length && rows > 1) {
      setRows(rows - 1);
    }
  }, [windowSize]);

  useEffect(() => {
    if (user) {
      dispatch(loadFavoriteCards());
    }
  }, [user]);
  return (
    <div>
      <PageTitle title="Business Card Hub" subtitle="Connecting Professionals: Your Business Card Hub" />
      <CardsContainer>
        {cardsDiplayed.map((card) => {
          return <Card key={card.id} card={card} disableCRUD={true} />;
        })}
      </CardsContainer>
      <ButtonsContainer>
        <Button onClick={decreaseRows}>
          <KeyboardArrowUpIcon />
        </Button>
        <Button onClick={increaseRows}>
          <KeyboardArrowDownIcon />
        </Button>
      </ButtonsContainer>
    </div>
  );
};

export default Home;
