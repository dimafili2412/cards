import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'window',
  initialState: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  reducers: {
    setWindowSize: (state, action) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
  },
});

//actions
export const { setWindowSize } = themeSlice.actions;

//selectors
export const selectWindowSize = (state) => state.window;

export default themeSlice.reducer;
