import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form/Form';
import PageFormContainer from '../components/PageFormContainer/PageFormContainer';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/user/userSlice';
import PageTitle from '../components/PageTitle/PageTitle';

import api from '../api';

const LoginFail = styled.h2`
  color: ${({ theme }) => theme.text.error};
  margin: 20px 0;
  text-align: center;
`;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginFailMessage, setLoginFailMessage] = useState('');
  const fields = [
    { label: 'Email', name: 'email', placeholder: 'Enter your Email...', validationType: 'email', requried: true, type: 'text' },
    { label: 'Password', name: 'password', placeholder: 'Enter your password...', required: true, password: true, type: 'password' },
  ];
  const handleLogin = async (values) => {
    try {
      const result = await api.post('/login', values);
      if (result.data.token) {
        localStorage.setItem('token', result.data.token);
      }
      dispatch(setUser(result.data.user));
      navigate('/');
    } catch (err) {
      if (err.response.status === 401) {
        setLoginFailMessage(err.response.data.message);
      } else {
        setLoginFailMessage('The website has encountered an error, please try again later or contact tech support.');
      }
    }
  };
  return (
    <PageFormContainer>
      <PageTitle title="Login"></PageTitle>
      <Form columns={1} fields={fields} onSubmit={handleLogin} />
      {loginFailMessage ? <LoginFail>{loginFailMessage}</LoginFail> : null}
    </PageFormContainer>
  );
};

export default Login;
