import { describe, it, expect } from "vitest"
import datesReducer, {
  setNewDate,
  updateChosenDate,
} from "../slices/datesStore"

describe("datesSlice", () => {
  const initialState = {
    chosenDate: new Date(2026, 0, 1).toISOString(),
    newDate: new Date(2026, 0, 1).toISOString(),
  }

  it("должен вернуть начальное состояние", () => {
    expect(datesReducer(undefined, { type: "unknown" })).toEqual(initialState)
  })

  it("должен обновить newDate через setNewDate", () => {
    const newDate = "2026-08-23T00:00:00.000Z"
    const action = setNewDate(newDate)
    const state = datesReducer(initialState, action)

    expect(state.newDate).toBe(newDate)
    expect(state.chosenDate).toBe(initialState.chosenDate)
  })

  it("должен обновить chosenDate через updateChosenDate", () => {
    const newDate = "2026-08-23T00:00:00.000Z"

    const stateAfterSet = datesReducer(initialState, setNewDate(newDate))
    const finalState = datesReducer(stateAfterSet, updateChosenDate())

    expect(finalState.chosenDate).toBe(newDate)
    expect(finalState.newDate).toBe(newDate)
  })

  it("должен корректно работать последовательность: setNewDate → updateChosenDate → setNewDate", () => {
    const firstDate = "2026-08-23T00:00:00.000Z"
    const secondDate = "2026-08-24T00:00:00.000Z"

    let state = datesReducer(initialState, setNewDate(firstDate))
    state = datesReducer(state, updateChosenDate())
    state = datesReducer(state, setNewDate(secondDate))

    expect(state.chosenDate).toBe(firstDate)
    expect(state.newDate).toBe(secondDate)
  })

  it("должен сохранять chosenDate неизменным при повторном вызове setNewDate без updateChosenDate", () => {
    const firstDate = "2026-08-23T00:00:00.000Z"
    const secondDate = "2026-08-24T00:00:00.000Z"

    let state = datesReducer(initialState, setNewDate(firstDate))
    state = datesReducer(state, updateChosenDate())
    state = datesReducer(state, setNewDate(secondDate))

    expect(state.chosenDate).toBe(firstDate)
    expect(state.newDate).toBe(secondDate)
  })
})
