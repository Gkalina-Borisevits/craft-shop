import { createAppSlice } from "../../../app/createAppSlice"
import {
  addQuestionCard,
  deleteQuestionCard,
  getAllQuestionCards,
  getQuestionCardById,
} from "../api"
import type { QuestionState } from "../types/Question"

const initialState: QuestionState = {
  questions: undefined,
  question: undefined,
  loading: false,
  error: null,
}

interface ThunkArg {
  formData: FormData
}

export const questionSlice = createAppSlice({
  name: "questions",
  initialState,

  reducers: create => ({
    addQuestion: create.asyncThunk(
      async ({ formData }: ThunkArg, thunkAPI) => {
        const response = await addQuestionCard(formData)
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.question = action.payload
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    getQuestions: create.asyncThunk(
      async (_, thunkApi) => {
        const response = await getAllQuestionCards()
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.questions = action.payload
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    getQuestionById: create.asyncThunk(
      async (id: number, thunkApi) => {
        const response = await getQuestionCardById(id)
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.question = action.payload
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    deleteQuestion: create.asyncThunk(
      async (id: number, thunkAp) => {
        const response = await deleteQuestionCard(id)
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.question = undefined
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
  }),

  selectors: {
    selectQuestions: state => state.questions,
    selectQuestion: state => state.question,
  },
})

export const { addQuestion, getQuestions, getQuestionById, deleteQuestion } =
  questionSlice.actions

export const { selectQuestions, selectQuestion } = questionSlice.selectors
