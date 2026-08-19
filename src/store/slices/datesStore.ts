import { createSlice } from "@reduxjs/toolkit"



const initialState = {
  chosenDate: new Date(2026, 0, 1).toISOString(),
  newDate: new Date(2026, 0, 1).toISOString(),
}

const datesSlice = createSlice({
  name: "dates",
  initialState,
  reducers: {
    setNewDate: (state, action: { payload: string; action?: string }) => {
      state.newDate = action.payload
      
    },
    updateChosenDate: (state) => {
      
      state.chosenDate = state.newDate
    },
  },
})

export const { setNewDate, updateChosenDate } = datesSlice.actions

export default datesSlice.reducer
