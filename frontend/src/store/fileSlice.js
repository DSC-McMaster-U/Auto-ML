import { createSlice } from '@reduxjs/toolkit';

export const fileSlice = createSlice({
  name: 'file',
  initialState: {
    value: '',
  },
  reducers: {
    setFile: (state, action) => {
      state.value = action.payload;
    },
    clearFile: (state) => {
      state.value = '';
    },
  },
});

export const { setFile, clearFile } = fileSlice.actions;

export default fileSlice.reducer;
