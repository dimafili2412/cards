import { useDispatch } from 'react-redux';
import { addToast, removeToast } from '../features/toast/toastSlice';

let id = 0;

const useToast = () => {
  const dispatch = useDispatch();

  const showToast = ({ text, duration = 15000, color = 'accent' }) => {
    const toastId = ++id;
    dispatch(addToast({ id: toastId, text, duration, color }));
    setTimeout(() => {
      dispatch(removeToast(toastId));
    }, duration);
  };

  return showToast;
};

export default useToast;
