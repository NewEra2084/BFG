import { createSlice } from "@reduxjs/toolkit"

/**
 * Начальное состояние слайса дат.
 * - chosenDate: подтверждённая пользователем дата, по которой ведётся поиск.
 * - newDate: новая дата, выбранная в календаре (ещё не подтверждена).
 */
const initialState = {
  chosenDate: new Date(2026, 0, 1).toISOString(),
  newDate: new Date(2026, 0, 1).toISOString(),
}

const datesSlice = createSlice({
  name: "dates",
  initialState,
  reducers: {
    /**
     * Устанавливает новую дату.
     * @param state - Текущее состояние.
     * @param action - Пейлоад с новой датой в формате ISO-строки.
     */
    setNewDate: (state, action: { payload: string; action?: string }) => {
      state.newDate = action.payload
    },
    /**
     * Подтверждает выбранную дату.
     * Копирует значение newDate в chosenDate.
     * @param state - Текущее состояние.
     */
    updateChosenDate: (state) => {
      state.chosenDate = state.newDate
    },
  },
})

export const { setNewDate, updateChosenDate } = datesSlice.actions

export default datesSlice.reducer