import { createSlice } from '@reduxjs/toolkit';

const activeStepSlice = createSlice({
  name: 'activeStep',
  initialState: {
    value: -1,
  },
  reducers: {
    setActiveStep: (state, action) => {
      console.log('action', action);
      state.value = action.payload;
    },
    clearActiveStep: (state) => {
      state.value = 0;
    },
  },
});

export const { setActiveStep, clearActiveStep } = activeStepSlice.actions;
export default activeStepSlice.reducer;