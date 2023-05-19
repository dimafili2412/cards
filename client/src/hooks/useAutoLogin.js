import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectUser } from '../features/user/userSlice';
import api from '../api';

const useAutoLogin = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector(selectUser);

  useEffect(() => {
    // Login automatically if token is present and not logged in
    if (localStorage.getItem('token') && !activeUser) {
      api
        .put('/login')
        .then((result) => {
          dispatch(setUser(result.data.user));
        })
        .catch((err) => {
          return;
        });
    }
  }, []);
};

export default useAutoLogin;
