import { configureStore } from '@reduxjs/toolkit';
import fileReducer from './fileSlice';

export default configureStore({
  reducer: {
    file: fileReducer,
  },
});
