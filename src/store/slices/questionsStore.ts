import type { Question } from "@/components/types/question"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

type QuestionsState = {
  questions: Question[]
  status: "loading" | "succeeded" | "failed"
  error: string | null
  selectedQuestionId: number | null
  swapArray: number[]
}

type fetchError = {
  error_id: number
  error_name: string
  error_message: string
}

const initialState: QuestionsState = {
  questions: [],
  status: "loading",
  error: null,
  selectedQuestionId: null,
  swapArray: []
}

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async (date: string) => {
    const perPage = 5
    const fromDate = Date.parse(date) / 1000 || 1767225600 // 1.1.2026
    const link = `https://api.stackexchange.com/2.3/questions?page=1&pagesize=${perPage}&fromdate=${fromDate}&order=desc&sort=votes&site=stackoverflow`
    try {
      const req = await fetch(link)
      if(!req.ok){
        const errorText:fetchError = await req.json();
        throw new Error(`HTTP ${errorText.error_id}: ${errorText.error_message} (${errorText.error_name})`)
      }
      const res = await req.json()
      return res.items
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error('Неизвестная ошибка');
    }
  }
)

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    openQuestion: (state, action)=>{
      if(state.selectedQuestionId === action.payload) return
      state.selectedQuestionId = action.payload
    },
    
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.questions = action.payload
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Ошибка загрузки"
      })
  },
})

export const {openQuestion} = questionsSlice.actions

export default questionsSlice.reducer
