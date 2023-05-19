import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// Actions
export const loadAllCards = createAsyncThunk('cards/loadCards', async () => {
  try {
    const response = await api.get('/cards/all');
    return { all: response.data };
  } catch (err) {
    throw Error('Failed to load cards.');
  }
});

export const loadFavoriteCards = createAsyncThunk('cards/loadFavoriteCards', async () => {
  try {
    const response = await api.get('/cards/favorite');
    return { favorite: response.data };
  } catch (err) {
    throw Error('Failed to load favorite cards.');
  }
});

export const loadMyCards = createAsyncThunk('cards/loadMyCards', async () => {
  try {
    const response = await api.get('/cards/my');
    return { my: response.data };
  } catch (err) {
    throw Error('Failed to load my cards.');
  }
});

// Reducers
const loadPending = (state) => {
  state.loading = true;
  state.error = null;
};

const loadRejected = (state, action) => {
  state.loading = false;
  state.error = action.error.message;
};

const loadFulfilled = (state, action) => {
  if (action.payload['all']) {
    state.allCards = action.payload.all;
  }
  if (action.payload['favorite']) {
    state.favoriteCards = action.payload.favorite;
  }
  if (action.payload['my']) {
    state.myCards = action.payload.my;
  }
};

// Slice
//normaly both pagination and search would be implemented in BE but times short + not using a real DB so FE FTW :)
const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    allCards: [],
    filter: '',
    favoriteCards: [],
    myCards: [],
    loading: false,
    error: null,
    searchTerm: '',
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  //will add loading animations if time allows
  extraReducers: (builder) => {
    builder
      .addCase(loadAllCards.pending, loadPending)
      .addCase(loadFavoriteCards.pending, loadPending)
      .addCase(loadMyCards.pending, loadPending)
      .addCase(loadAllCards.fulfilled, loadFulfilled)
      .addCase(loadFavoriteCards.fulfilled, loadFulfilled)
      .addCase(loadMyCards.fulfilled, loadFulfilled)
      .addCase(loadAllCards.rejected, loadRejected)
      .addCase(loadFavoriteCards.rejected, loadRejected)
      .addCase(loadMyCards.rejected, loadRejected);
  },
});

export const { setSearchTerm } = cardsSlice.actions;

export default cardsSlice.reducer;

// Selectors
export const selectCard = (id) => (state) => {
  return state.cards.allCards.find((card) => card.id === id);
};
export const selectAllCards = (state) => state.cards.allCards;
export const selectFavoriteCardIds = (state) => state.cards.favoriteCards;
export const selectFavoriteCards = (state) => state.cards.allCards.filter((card) => state.cards.favoriteCards.includes(card.id));
export const selectMyCards = (state) => state.cards.myCards;
export const selectSearchTerm = (state) => state.cards.searchTerm;
export const selectFilteredCards = (state) => {
  return state.cards.allCards.filter((card) => {
    return Object.values(card).some((value) => value.toString().toLowerCase().includes(state.cards.searchTerm.toLowerCase()));
  });
};
