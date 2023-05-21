import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import CallIcon from '@mui/icons-material/Call';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { loadFavoriteCards, selectFavoriteCardIds } from '../../features/cards/cardsSlice';
import { selectUser } from '../../features/user/userSlice';
import api from '../../api';
import Modal from '../Modal/Modal';
import { StyledCard, Image, Header, Title, Subtitle, Divider, Body, Footer, AddIconContainer } from './Card.styled';
import useToast from '../../hooks/useToast';

const Card = ({ card = {}, disableCRUD = false, newCard = false, onDelete }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const favoriteCardIds = useSelector(selectFavoriteCardIds);
  const showToast = useToast();
  const [src, setSrc] = useState(card.imageUrl || process.env.PUBLIC_URL + '/images/card_stock_image.jpg');
  const modalInitialState = { title: '', body: '', show: false, onOk: () => {}, onCancel: () => {} };
  const [deleteCardModal, setDeleteCardModal] = useState({ ...modalInitialState });

  const showDelete = () => {
    if (user && !disableCRUD) {
      if (user.admin || user.id === card.createdByUserId) {
        return true;
      }
    }
    return false;
  };

  const showEdit = () => {
    if (user && !disableCRUD) {
      if (user.admin || user.id === card.createdByUserId) {
        return true;
      }
    }
    return false;
  };

  const showFavorite = () => {
    if (user) {
      return true;
    }
    return false;
  };
  const handleCardClick = () => {
    if (!newCard) {
      navigate(`/Business/${card.id}`);
    }
  };

  const isFavorite = () => {
    return favoriteCardIds?.includes(card.id);
  };

  const handleFavoriteClick = async () => {
    const response = await api[isFavorite() ? 'delete' : 'post'](`/cards/${isFavorite() ? 'remove' : 'add'}-favorite/${card.id}`);
    if ((response.status = 200)) {
      dispatch(loadFavoriteCards());
    }
  };

  const handleEditClick = () => {
    navigate(`/EditCard/${card.id}`);
  };

  const handleDeleteClick = async () => {
    setDeleteCardModal({
      title: 'Delete Card',
      body: `Are you sure you want to delete the card ${card.id} - ${card.title}?`,
      show: true,
      onOk: async () => {
        try {
          const response = await api.delete(`/cards/${card.id}`);
          if (typeof onDelete === 'function') {
            onDelete();
          }
          showToast({
            text: `Card ${card.id} - ${card.title} has been deleted succesfully.`,
          });
        } catch (err) {
          showToast({
            text: `Deleting card ${card.id} - ${card.title} has failed.`,
            color: 'error',
          });
        }
      },
      onCancel: () => {
        setDeleteCardModal({ ...modalInitialState });
      },
    });
  };

  const handleImageLoadError = () => {
    setSrc(process.env.PUBLIC_URL + '/images/card_stock_image.jpg');
  };

  const handleNewCardClick = () => {
    navigate('/NewCard');
  };

  const handleCallClick = () => {
    window.open(`tel:${card.phone}`);
  };

  return (
    <StyledCard>
      <Image src={src} alt={card.imageAlt || 'Stock card picture'} onClick={handleCardClick} onError={handleImageLoadError} clickable={!newCard} />
      <Header>
        <Title>{newCard ? 'New Card' : card.title}</Title>
        <Subtitle>{newCard ? 'Click below to create a new card' : card.subtitle}</Subtitle>
      </Header>
      <Divider />
      <Body>
        {newCard ? (
          <AddIconContainer>
            <AddIcon onClick={handleNewCardClick} />
          </AddIconContainer>
        ) : (
          <ul>
            <li>
              <strong>Phone: </strong>
              {card.phone}
            </li>
            <li>
              <strong>Address: </strong>
              {card.address}
            </li>
            <li>
              <strong>Number: </strong>
              {card.id}
            </li>
          </ul>
        )}
      </Body>
      {newCard ? null : (
        <Footer>
          {showDelete() ? <DeleteIcon onClick={handleDeleteClick} /> : null}
          {showEdit() ? <EditIcon onClick={handleEditClick} /> : null}
          <div>
            <CallIcon onClick={handleCallClick} />
            {showFavorite() ? <FavoriteIcon className={`favorite-icon ${isFavorite() ? 'favorite' : ''}`} onClick={handleFavoriteClick} /> : null}
          </div>
        </Footer>
      )}
      <Modal {...deleteCardModal} />
    </StyledCard>
  );
};

export default Card;
