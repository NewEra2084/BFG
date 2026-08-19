// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from './slices/questionsStore';
import datesReducer from './slices/datesStore';

export const GlobalStore = configureStore({
  reducer: {
    questions: questionsReducer,
    dates: datesReducer
  },
});

export type RootState = ReturnType<typeof GlobalStore.getState>;
export type AppDispatch = typeof GlobalStore.dispatch;