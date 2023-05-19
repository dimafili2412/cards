import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form/Form';
import PageFormContainer from '../components/PageFormContainer/PageFormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/user/userSlice';
import { selectWindowSize } from '../features/window/windowSlice';
import { selectBreakpoints } from '../features/theme/themeSlice';
import PageTitle from '../components/PageTitle/PageTitle';

import api from '../api';

const RegisterFail = styled.h2`
  color: ${({ theme }) => theme.text.error};
  margin: 20px 0;
  text-align: center;
`;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const windowSize = useSelector(selectWindowSize);
  const breakpoints = useSelector(selectBreakpoints);
  const [registerFailMessage, setRegisterFailMessage] = useState('');
  const fields = [
    { label: 'First Name', name: 'firstName', placeholder: 'Enter your First Name...', type: 'text', required: true },
    { label: 'Last Name', name: 'lastName', placeholder: 'Enter your Last Name...', type: 'text', required: true },
    { label: 'Middle Name', name: 'middleName', placeholder: 'Enter your Middle Name...', type: 'text' },
    { label: 'Phone', name: 'phone', placeholder: 'Phone...', type: 'text', required: true, validationType: 'phone' },
    { label: 'E-Mail', name: 'email', placeholder: 'Email...', validationType: 'email', requried: true, type: 'text' },
    { label: 'Password', name: 'password', placeholder: 'Password...', required: true, password: true, type: 'password', validationType: 'password' },
    { label: 'Country', name: 'country', placeholder: 'Country...', type: 'text', required: true },
    { label: 'State', name: 'state', placeholder: 'State...', type: 'text' },
    { label: 'City', name: 'city', placeholder: 'City...', type: 'text', required: true },
    { label: 'Address', name: 'address', placeholder: 'Address...', type: 'text', required: true },
    { label: 'Zip', name: 'zip', placeholder: 'Zip...', type: 'text', required: true },
    { label: 'Sign up as business', name: 'business', type: 'checkbox' },
  ];
  const columns = windowSize.width < breakpoints.mobile ? 1 : 2;
  const handleRegister = async (values) => {
    try {
      const result = await api.post('/register', values);
      if (result.data.token) {
        localStorage.setItem('token', result.data.token);
      }
      dispatch(setUser(result.data.user));
      navigate('/');
    } catch (err) {
      if (err.response.status === 409) {
        setRegisterFailMessage(err.response.data.message);
      } else {
        setRegisterFailMessage('The website has encountered an error, please try again later or contact tech support.');
      }
    }
  };
  return (
    <PageFormContainer>
      <PageTitle title="Register" />
      <Form columns={columns} fields={fields} onSubmit={handleRegister} />
      {registerFailMessage ? <RegisterFail>{registerFailMessage}</RegisterFail> : null}
    </PageFormContainer>
  );
};

export default Register;
