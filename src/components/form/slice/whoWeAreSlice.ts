import { createAppSlice } from "../../../app/createAppSlice"
import {
  addWhoWeAreCard,
  deleteWhoWeAreCard,
  getAllWhoWeAreCards,
  getWhoWeAreCardById,
} from "../api"
import type { WhoWeAreFormData, WhoWeAreState } from "../types/WhoWeAreFormData"

const initialState: WhoWeAreState = {
  whoWeAres: undefined,
  whoWeAre: undefined,
  loading: false,
  error: null,
}

export const whoWeAreSlice = createAppSlice({
  name: "whoWeAres",
  initialState,

  reducers: create => ({
    addWhoWeAre: create.asyncThunk(
      async (formData: WhoWeAreFormData) => {
        const response = await addWhoWeAreCard(formData)
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.whoWeAre = action.payload
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    getWhoWeAre: create.asyncThunk(
      async (_, thunkApi) => {
        const response = await getAllWhoWeAreCards()
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.whoWeAres = action.payload
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    getWhoWeAreById: create.asyncThunk(
      async (id: number, thunkApi) => {
        const response = await getWhoWeAreCardById(id)
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.whoWeAre = action.payload
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    deleteWhoWeAre: create.asyncThunk(
      async (id: number, thunkAp) => {
        const response = await deleteWhoWeAreCard(id)
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.whoWeAre = undefined
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
  }),

  selectors: {
    selectWhoWeAres: state => state.whoWeAres,
    selectWhoWeAre: state => state.whoWeAre,
  },
})

export const { addWhoWeAre, getWhoWeAre, getWhoWeAreById, deleteWhoWeAre } =
  whoWeAreSlice.actions

export const { selectWhoWeAres, selectWhoWeAre } = whoWeAreSlice.selectors
