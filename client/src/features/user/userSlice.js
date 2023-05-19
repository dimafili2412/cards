import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

export const loadAllUsers = createAsyncThunk('user/fetchUsers', async () => {
  try {
    const response = await api.get('/users/all');
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    active: undefined,
    all: undefined,
    status: 'idle',
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.active = action.payload;
    },
    clearUser: (state) => {
      state.active = undefined;
    },
  },
  //will add loading if time allows
  extraReducers: (builder) => {
    builder
      .addCase(loadAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.all = action.payload;
      })
      .addCase(loadAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state) => state.user.active;
export const selectAllUsers = (state) => state.user.all;

export default userSlice.reducer;
