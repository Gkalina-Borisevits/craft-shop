import { createAppSlice } from "../../../app/createAppSlice"
import {
  addCareersCard,
  deleteCareersCard,
  getAllCareersCards,
  getCareerCardById,
} from "../api"
import type { CareersFormData, CareersState } from "../types/CareersFormData"

const initialState: CareersState = {
  careers: undefined,
  career: undefined,
  loading: false,
  error: null,
}

export const careerSlice = createAppSlice({
  name: "careers",
  initialState,

  reducers: create => ({
    addCareers: create.asyncThunk(
      async (formData: CareersFormData) => {
        const response = await addCareersCard(formData)
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.career = action.payload
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    getCareers: create.asyncThunk(
      async (_, thunkApi) => {
        const response = await getAllCareersCards()
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.careers = action.payload
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    getCareerById: create.asyncThunk(
      async (id: number, thunkApi) => {
        const response = await getCareerCardById(id)
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.career = action.payload
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    deleteCareer: create.asyncThunk(
      async (id: number, thunkAp) => {
        const response = await deleteCareersCard(id)
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.career = undefined
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
  }),

  selectors: {
    selectCareers: state => state.careers,
    selectCareer: state => state.career,
  },
})

export const { addCareers, getCareerById, getCareers, deleteCareer } =
  careerSlice.actions

export const { selectCareers, selectCareer } = careerSlice.selectors
