import { configureStore } from '@reduxjs/toolkit'
import questionsReducer from './slices/questionsStore'
import datesReducer from './slices/datesStore'

/**
 * Глобальный Redux-стор приложения.
 * Объединяет все слайсы в единое дерево состояния.
 */
export const GlobalStore = configureStore({
  reducer: {
    /** Слайс для управления вопросами */
    questions: questionsReducer,
    /** Слайс для управления датами */
    dates: datesReducer,
  },
})

/**
 * Тип корневого состояния стора.
 * Используется для типизации useSelector.
 */
export type RootState = ReturnType<typeof GlobalStore.getState>

/**
 * Тип диспатча.
 * Используется для типизации useDispatch.
 */
export type AppDispatch = typeof GlobalStore.dispatch