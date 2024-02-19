import { configureStore } from '@reduxjs/toolkit';
import datasetReducer from './datasetSlice';

export default configureStore({
  reducer: {
    dataset: datasetReducer,
  },
});
