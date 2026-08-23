import { describe, it, expect } from 'vitest'
import questionsReducer, {
  openQuestion,
  swapQuestions,
  clearSwap,
  upvote,
  downvote,
  fetchQuestions,
  type QuestionsState,
} from '../slices/questionsStore'
import { mockFirst5Questions } from './api_mock'

describe('questionsSlice', () => {
  const initialState: QuestionsState = {
    questions: mockFirst5Questions,
    status: 'succeeded',
    error: null,
    selectedQuestionId: null,
    swapArray: [],
    upVotes: [],
  }

  it('должен вернуть начальное состояние', () => {
    expect(questionsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    )
  })

  it('openQuestion: должен установить выбранный вопрос', () => {
    const id = mockFirst5Questions[0].question_id
    const state = questionsReducer(initialState, openQuestion(id))
    expect(state.selectedQuestionId).toBe(id)
  })

  it('swapQuestions: должен менять местами два вопроса', () => {
    const q1 = mockFirst5Questions[0]
    const q2 = mockFirst5Questions[1]

    let state = questionsReducer(initialState, swapQuestions(q1))
    state = questionsReducer(state, swapQuestions(q2))

    const expected = [...mockFirst5Questions]
    expected[0] = q2
    expected[1] = q1

    expect(state.questions).toEqual(expected)
    expect(state.swapArray).toEqual([])
  })

  it('upvote / downvote: должен добавлять и переключать голоса', () => {
    const id = mockFirst5Questions[0].question_id

    // upvote → добавляет
    let state = questionsReducer(initialState, upvote(id))
    expect(state.upVotes).toContainEqual({ id, state: 'up' })

    // повторный upvote → удаляет
    state = questionsReducer(state, upvote(id))
    expect(state.upVotes).not.toContainEqual({ id, state: 'up' })
    expect(state.upVotes).toHaveLength(0)

    // downvote → добавляет
    state = questionsReducer(initialState, downvote(id))
    expect(state.upVotes).toContainEqual({ id, state: 'down' })

    // upvote → меняет down на up
    state = questionsReducer(state, upvote(id))
    expect(state.upVotes).toContainEqual({ id, state: 'up' })
    expect(state.upVotes).toHaveLength(1)
  })

  it('clearSwap: должен очищать swapArray', () => {
    const q1 = mockFirst5Questions[0]
    let state = questionsReducer(initialState, swapQuestions(q1))
    state = questionsReducer(state, clearSwap())
    expect(state.swapArray).toEqual([])
  })

  it('fetchQuestions: должен менять статусы загрузки', () => {
    // pending
    const pendingState = questionsReducer(initialState, {
      type: fetchQuestions.pending.type,
    })
    expect(pendingState.status).toBe('loading')

    // fulfilled
    const fulfilledState = questionsReducer(initialState, {
      type: fetchQuestions.fulfilled.type,
      payload: mockFirst5Questions,
    })
    expect(fulfilledState.status).toBe('succeeded')
    expect(fulfilledState.questions).toEqual(mockFirst5Questions)

    // rejected
    const rejectedState = questionsReducer(initialState, {
      type: fetchQuestions.rejected.type,
      error: { message: 'Ошибка' },
    })
    expect(rejectedState.status).toBe('failed')
    expect(rejectedState.error).toBe('Ошибка')
  })
})