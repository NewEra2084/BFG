import type { Question } from "@/components/types/question"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { mockFirst5Questions } from "../__tests__/api_mock"

type QuestionsState = {
  questions: Question[]
  status: "loading" | "succeeded" | "failed"
  error: string | null
  selectedQuestionId: number | null
  swapArray: Question[]
}

type fetchError = {
  error_id: number
  error_name: string
  error_message: string
}

const initialState: QuestionsState = {
  // questions: [],
  questions: mockFirst5Questions,
  status: "succeeded",
  error: null,
  selectedQuestionId: null,
  swapArray: [],
}

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async (date: string) => {
    const perPage = 5
    const fromDate = Date.parse(date) / 1000 || 1767225600 // 1.1.2026
    const link = `https://api.stackexchange.com/2.3/questions?page=1&pagesize=${perPage}&fromdate=${fromDate}&order=desc&sort=votes&site=stackoverflow`
    try {
      const req = await fetch(link)
      if (!req.ok) {
        const errorText: fetchError = await req.json()
        throw new Error(
          `HTTP ${errorText.error_id}: ${errorText.error_message} (${errorText.error_name})`
        )
      }
      const res = await req.json()
      return res.items
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error("Неизвестная ошибка")
    }
  }
)

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    openQuestion: (state, action) => {
      if (state.selectedQuestionId === action.payload) return
      state.selectedQuestionId = action.payload
    },
    setQuestions: (state, action) => {
      state.questions = action.payload
    },
    clearSwap: (state) => {
      if (state.swapArray.length === 0) return
      state.swapArray = []
    },
    swapQuestions: (state, action: { payload: Question }) => {
      if (state.swapArray.includes(action.payload)) {
        state.swapArray = []
        return
      }

      state.swapArray = [...state.swapArray, action.payload]

      if (state.swapArray.length >= 2) {
        const first = state.questions.findIndex(
          (item) => item.question_id === state.swapArray[0].question_id
        )
        const second = state.questions.findIndex(
          (item) => item.question_id === state.swapArray[1].question_id
        )

        const newQuestions = [...state.questions]

        newQuestions[first] = state.questions[second]
        newQuestions[second] = state.questions[first]
        state.questions = newQuestions
        state.swapArray = []
      }
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

export const { openQuestion, swapQuestions, clearSwap, setQuestions } =
  questionsSlice.actions

export default questionsSlice.reducer
