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

// export const fetchQuestions = async () => {
//   const link = "https://api.stackexchange.com/2.3/questions?page=1&pagesize=5&fromdate=1767225600&order=desc&sort=votes&site=stackoverflow";
//   const req = await fetch(link);
//   const res = await req.json();
//   return res.items;
// }