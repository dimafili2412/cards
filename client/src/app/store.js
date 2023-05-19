import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import userReducer from '../features/user/userSlice';
import cardsReducer from '../features/cards/cardsSlice';
import windowReducer from '../features/window/windowSlice';
import toastReducer from '../features/toast/toastSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    window: windowReducer,
    user: userReducer,
    cards: cardsReducer,
    toast: toastReducer,
  },
});
