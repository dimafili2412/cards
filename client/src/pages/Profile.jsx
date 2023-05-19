import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../features/user/userSlice';
import PageTitle from '../components/PageTitle/PageTitle';
import { selectBreakpoints } from '../features/theme/themeSlice';
import { ProfileWrapper, InfoWrapper, InfoItem, ButtonWrapper } from './Profile.styled';
import Button from '../components/Button/Button';

const ProfileInfo = ({ label, value, breakpoint }) => (
  <InfoItem breakpoint={breakpoint}>
    <span>{label}</span> {value || 'N/A'}
  </InfoItem>
);

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const breakpoints = useSelector(selectBreakpoints);
  if (!user) return null;
  const userInfo = [
    { label: 'First Name:', value: user.firstName },
    { label: 'Middle Name:', value: user.middleName },
    { label: 'Last Name:', value: user.lastName },
    { label: 'Email:', value: user.email },
    { label: 'Phone:', value: user.phone },
    { label: 'Country:', value: user.country },
    { label: 'State:', value: user.state },
    { label: 'City:', value: user.city },
    { label: 'Address:', value: user.address },
    { label: 'Zip Code:', value: user.zip },
  ];

  const handleEditClick = () => {
    navigate('/EditProfile');
  };

  return (
    <div>
      <PageTitle title="Profile" subtitle={`${user.firstName} ${user.lastName}`} />
      <ProfileWrapper>
        <InfoWrapper breakpoint={breakpoints.mobile}>
          {userInfo.map((info, index) => (
            <ProfileInfo key={index} label={info.label} value={info.value} breakpoint={breakpoints.mobile} />
          ))}
          <ButtonWrapper>
            <Button onClick={handleEditClick}>Edit Profile</Button>
          </ButtonWrapper>
        </InfoWrapper>
      </ProfileWrapper>
    </div>
  );
};

export default Profile;
