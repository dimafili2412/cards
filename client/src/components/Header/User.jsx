import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../features/user/userSlice';
import { StyledLink } from './styledLink';
import { UserContainer, UserIcon, UserMenu } from './User.styled';
import { clearUser } from '../../features/user/userSlice';

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const userIconRef = useRef(null);
  const handleUserIconClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutsideMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target) && userIconRef.current && !userIconRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideMenu);
    return () => {
      document.removeEventListener('click', handleClickOutsideMenu);
    };
  }, []);

  const handleLogoutClick = () => {
    setMenuOpen(false);
    dispatch(clearUser());
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleProfileClick = () => {
    setMenuOpen(false);
    navigate('/Profile');
  };

  return (
    <UserContainer>
      {user ? (
        <UserIcon onClick={handleUserIconClick} ref={userIconRef} />
      ) : (
        [
          <StyledLink to="/Login" key="login-button">
            Login
          </StyledLink>,
          <StyledLink to="/Register" key="register-button">
            Register
          </StyledLink>,
        ]
      )}
      <UserMenu open={menuOpen} ref={menuRef}>
        <ul>
          <li onClick={handleProfileClick}>Profile</li>
          <li onClick={handleLogoutClick}>Logout</li>
        </ul>
      </UserMenu>
    </UserContainer>
  );
};

export default User;
