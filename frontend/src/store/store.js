import { configureStore } from '@reduxjs/toolkit';
import datasetReducer from './datasetSlice';
import activeStepReducer from './activeStepSlice';

export default configureStore({
  reducer: {
    dataset: datasetReducer,
    activeStep: activeStepReducer,
  },
});
