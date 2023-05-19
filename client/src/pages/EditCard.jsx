import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form/Form';
import PageFormContainer from '../components/PageFormContainer/PageFormContainer';
import { selectWindowSize } from '../features/window/windowSlice';
import { selectBreakpoints } from '../features/theme/themeSlice';
import PageTitle from '../components/PageTitle/PageTitle';
import api from '../api';
import useToast from '../hooks/useToast';
import { loadAllCards, selectCard } from '../features/cards/cardsSlice';
import { useParams } from 'react-router-dom';

//authentication for card editing rights is done at BE :)

const EditCard = () => {
  const { id } = useParams();
  const card = useSelector(selectCard(parseInt(id))) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showToast = useToast();
  const windowSize = useSelector(selectWindowSize);
  const breakpoints = useSelector(selectBreakpoints);
  useEffect(() => {
    dispatch(loadAllCards());
  }, []);
  const fields = [
    { label: 'Title', name: 'title', type: 'text', required: true, default: card.title },
    { label: 'subtitle', name: 'subtitle', type: 'text', required: true, default: card.subtitle },
    { label: 'Description', name: 'description', type: 'text', required: true, default: card.description },
    { label: 'Phone', name: 'phone', type: 'text', required: true, validationType: 'phone', default: card.phone },
    { label: 'Email', name: 'email', type: 'text', required: true, validationType: 'email', default: card.email },
    { label: 'Website', name: 'web', type: 'text', required: true, validationType: 'url', default: card.web },
    { label: 'Image URL', name: 'imageUrl', type: 'text', validationType: 'url', default: card.imageUrl },
    { label: 'Image alt', name: 'imageAlt', type: 'text', default: card.imageAlt },
    { label: 'Country', name: 'country', type: 'text', required: true, default: card.country },
    { label: 'State', name: 'state', type: 'text', required: true, default: card.state },
    { label: 'City', name: 'city', type: 'text', required: true, default: card.city },
    { label: 'Address', name: 'address', type: 'text', required: true, default: card.address },
    { label: 'Zip code', name: 'zip', type: 'text', required: true, validationType: 'zip', default: card.zip },
  ];
  const columns = windowSize.width < breakpoints.mobile ? 1 : 2;
  const handleSubmit = async (values) => {
    try {
      const response = await api.patch(`/cards/${card.id}`, values);
      dispatch(loadAllCards());
      showToast({ text: 'Card updated successfully' });
    } catch (err) {
      showToast({ text: 'Failed to update card', color: 'error' });
    }
    navigate(-1);
  };
  return (
    <PageFormContainer>
      <PageTitle title="Edit Card" backButton={true} />
      <Form fields={fields} columns={columns} onSubmit={handleSubmit} />
    </PageFormContainer>
  );
};

export default EditCard;
