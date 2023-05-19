import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeToast } from '../../features/toast/toastSlice';
import { ToastMessage, ExitButton, ProgressBar } from './Toast.styled';

const colors = ['accent', 'error'];

const ToastItem = ({ toast }) => {
  const { id, text, duration = 15000 } = toast;
  let color = toast.color;
  const dispatch = useDispatch();
  const [width, setWidth] = useState(100);
  if (!colors.includes(color)) {
    color = 'accent';
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setWidth((prevWidth) => {
        if (prevWidth <= 0) {
          clearInterval(interval);
          dispatch(removeToast(id));
          return 0;
        } else {
          return prevWidth - 100 / (duration / 100);
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, [dispatch, duration, id]);

  return (
    <ToastMessage color={color}>
      {text}
      <ExitButton onClick={() => dispatch(removeToast(id))}>&times;</ExitButton>
      <ProgressBar width={width} />
    </ToastMessage>
  );
};
export default ToastItem;
