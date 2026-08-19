import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: []
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    updateQuestionsByDate: (state, action) =>{

    }
  },
});

export const { setQuestions } = questionsSlice.actions;

export default questionsSlice.reducer;