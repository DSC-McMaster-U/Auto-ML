import { createSlice } from '@reduxjs/toolkit';

const datasetSlice = createSlice({
  name: 'dataset',
  initialState: {
    value: '',
  },
  reducers: {
    setDataset: (state, action) => {
      console.log('action', action);
      state.value = action.payload;
    },
    clearDataset: (state) => {
      state.value = '';
    },
  },
});

export const { setDataset, clearDataset } = datasetSlice.actions;

// imported as datasetReducer in store.js
export default datasetSlice.reducer;
