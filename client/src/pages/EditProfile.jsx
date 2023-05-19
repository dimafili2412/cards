import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle/PageTitle';
import Form from '../components/Form/Form';
import PageFormContainer from '../components/PageFormContainer/PageFormContainer';
import api from '../api';
import { selectUser } from '../features/user/userSlice';
import { selectBreakpoints } from '../features/theme/themeSlice';
import { selectWindowSize } from '../features/window/windowSlice';
import useToast from '../hooks/useToast';
import { setUser } from '../features/user/userSlice';

const EditProfile = () => {
  const user = useSelector(selectUser);
  const breakpoints = useSelector(selectBreakpoints);
  const windowSize = useSelector(selectWindowSize);
  const navigate = useNavigate();
  const showToast = useToast();
  const dispatch = useDispatch();
  if (!user) return null;
  const fields = [
    { label: 'First Name', name: 'firstName', type: 'text', required: true, default: user.firstName },
    { label: 'Middle Name', name: 'middleName', type: 'text', default: user.middleName },
    { label: 'Last Name', name: 'lastName', type: 'text', required: true, default: user.lastName },
    { label: 'Country', name: 'country', type: 'text', required: true, default: user.country },
    { label: 'City', name: 'city', type: 'text', required: true, default: user.city },
    { label: 'State', name: 'state', type: 'text', default: user.state },
    { label: 'Phone', name: 'phone', type: 'text', required: true, default: user.phone, validationtype: 'phone' },
    { label: 'Address', name: 'address', type: 'text', required: true, default: user.address },
    { label: 'Zip Code', name: 'zip', type: 'text', required: true, default: user.zip, validationtype: 'zip' },
  ];
  const columns = windowSize.width < breakpoints.mobile ? 1 : 2;
  const handleSubmit = async (values) => {
    try {
      const response = await api.patch(`/users/${user.id}`, values);
      if (response.status === 200 && response.data) {
        dispatch(setUser(response.data));
      }
      showToast({ text: 'Profile updated successfully' });
    } catch (err) {
      showToast({ text: 'Failed to update profile', color: 'error' });
    }
    navigate('/Profile');
  };
  return (
    <div>
      <PageTitle title="Edit Profile" />
      <PageFormContainer>
        <Form fields={fields} columns={columns} onSubmit={handleSubmit} />
      </PageFormContainer>
    </div>
  );
};

export default EditProfile;
