import React from 'react';
import { useSelector } from 'react-redux';
import { ToastWrapper } from './Toast.styled';
import ToastItem from './ToastItem';

const Toast = () => {
  const toasts = useSelector((state) => state.toast);
  return (
    <ToastWrapper>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </ToastWrapper>
  );
};

export default Toast;
