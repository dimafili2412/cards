import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form/Form';
import PageFormContainer from '../components/PageFormContainer/PageFormContainer';
import { selectWindowSize } from '../features/window/windowSlice';
import { selectBreakpoints } from '../features/theme/themeSlice';
import PageTitle from '../components/PageTitle/PageTitle';
import api from '../api';
import useToast from '../hooks/useToast';
import { loadNumCards } from '../features/cards/cardsSlice';

const NewCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showToast = useToast();
  const windowSize = useSelector(selectWindowSize);
  const breakpoints = useSelector(selectBreakpoints);
  const fields = [
    { label: 'Title', name: 'title', type: 'text', required: true },
    { label: 'subtitle', name: 'subtitle', type: 'text', required: true },
    { label: 'Description', name: 'description', type: 'text', required: true },
    { label: 'Phone', name: 'phone', type: 'text', required: true, validationType: 'phone' },
    { label: 'Email', name: 'email', type: 'text', required: true, validationType: 'email' },
    { label: 'Website', name: 'web', type: 'text', required: true, validationType: 'url' },
    { label: 'Image URL', name: 'imageUrl', type: 'text', validationType: 'url' },
    { label: 'Image alt', name: 'imageAlt', type: 'text' },
    { label: 'Country', name: 'country', type: 'text', required: true },
    { label: 'State', name: 'state', type: 'text', required: true },
    { label: 'City', name: 'city', type: 'text', required: true },
    { label: 'Address', name: 'address', type: 'text', required: true },
    { label: 'Zip code', name: 'zip', type: 'text', required: true, validationType: 'zip' },
  ];
  const columns = windowSize.width < breakpoints.mobile ? 1 : 2;
  const handleSubmit = async (values) => {
    try {
      const response = await api.post('/cards', values);
      showToast({ text: `Card ${response.data.title} was created succesfully.` });
    } catch (err) {
      showToast({ text: <div>Creating a card has failed.</div>, color: 'error' });
    }
    navigate('/MyCards');
  };
  return (
    <PageFormContainer>
      <PageTitle title="New Card" backButton={true} />
      <Form fields={fields} columns={columns} onSubmit={handleSubmit} />
    </PageFormContainer>
  );
};

export default NewCard;
