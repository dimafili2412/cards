import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// Actions
export const loadNumCards = createAsyncThunk('cards/loadCards', async (num) => {
  try {
    const response = await api.get(`/cards/num/${num}`);
    return { all: response.data };
  } catch (err) {
    throw Error('Failed to load cards.');
  }
});

export const loadSingleCard = createAsyncThunk('cards/loadCard', async (id) => {
  try {
    const response = await api.get(`/cards/id/${id}`);
    return { all: response.data };
  } catch (err) {
    throw Error('Failed to load cards.');
  }
});

export const loadFilteredCards = createAsyncThunk('cards/loadFilteredCards', async (_, thunkAPI) => {
  const filter = thunkAPI.getState().cards.filter;
  try {
    const response = await api.get(`/cards/filter/${filter}`);
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
  state.loading++;
};

const loadRejected = (state, action) => {
  state.loading--;
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
  state.loading--;
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
    loading: 0,
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
      .addCase(loadNumCards.pending, loadPending)
      .addCase(loadFavoriteCards.pending, loadPending)
      .addCase(loadMyCards.pending, loadPending)
      .addCase(loadSingleCard.pending, loadPending)
      .addCase(loadFilteredCards.pending, loadPending)
      .addCase(loadNumCards.fulfilled, loadFulfilled)
      .addCase(loadFavoriteCards.fulfilled, loadFulfilled)
      .addCase(loadMyCards.fulfilled, loadFulfilled)
      .addCase(loadSingleCard.fulfilled, loadFulfilled)
      .addCase(loadFilteredCards.fulfilled, loadFulfilled)
      .addCase(loadNumCards.rejected, loadRejected)
      .addCase(loadFavoriteCards.rejected, loadRejected)
      .addCase(loadMyCards.rejected, loadRejected)
      .addCase(loadSingleCard.rejected, loadRejected)
      .addCase(loadFilteredCards.rejected, loadRejected);
  },
});

export const { setSearchTerm } = cardsSlice.actions;

export default cardsSlice.reducer;

// Selectors
export const selectCard = (id) => (state) => {
  return state.cards.allCards.find((card) => card.id === id);
};
export const selectAllCards = (state) => state.cards.allCards;
export const selectFavoriteCardIds = (state) => state.cards.favoriteCards.ids;
export const selectFavoriteCards = (state) => state.cards.favoriteCards.cards;
export const selectMyCards = (state) => state.cards.myCards;
export const selectSearchTerm = (state) => state.cards.searchTerm;
export const selectFilteredCards = (state) => {
  return state.cards.allCards.filter((card) => {
    return Object.values(card).some((value) => value.toString().toLowerCase().includes(state.cards.searchTerm.toLowerCase()));
  });
};
export const selectCardsLoading = (state) => state.cards.loading;
