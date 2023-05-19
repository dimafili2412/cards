import { createSlice } from '@reduxjs/toolkit';

const storedTheme = window.localStorage.getItem('theme') || 'light';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    name: storedTheme,
    breakpoints: {
      mobile: 768,
      tablet: 992,
      desktop: 1200,
    },
  },
  reducers: {
    toggleTheme: (state) => {
      state.name = state.name === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export const selectBreakpoints = (state) => state.theme.breakpoints;
export const selectTheme = (state) => state.theme.name;

export default themeSlice.reducer;
