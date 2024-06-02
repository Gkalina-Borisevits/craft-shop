import { createAppSlice } from "../../../app/createAppSlice"
import {
  addContactInfoCard,
  deleteContactInfoCard,
  getAllContactInfoCards,
  getContactInfoCardById,
} from "../api"
import type { ContactInfoState } from "../types/ContactInfo"

const initialState: ContactInfoState = {
  contactsInfo: undefined,
  contactInfo: undefined,
  loading: false,
  error: null,
}

interface ThunkArg {
  formData: FormData
}

export const contactInfoSlice = createAppSlice({
  name: "contactInfo",
  initialState,

  reducers: create => ({
    addContactInfo: create.asyncThunk(
      async ({ formData }: ThunkArg, thunkAPI) => {
        const response = await addContactInfoCard(formData)
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.contactInfo = action.payload
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    getContactsInfo: create.asyncThunk(
      async (_, thunkApi) => {
        const response = await getAllContactInfoCards()
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.contactsInfo = action.payload
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    getContactInfoById: create.asyncThunk(
      async (id: number, thunkApi) => {
        const response = await getContactInfoCardById(id)
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.contactInfo = action.payload
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    deleteContactInfo: create.asyncThunk(
      async (id: number, thunkAp) => {
        const response = await deleteContactInfoCard(id)
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.contactInfo = undefined
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
  }),

  selectors: {
    selectContactsInfo: state => state.contactsInfo,
    selectContactInfo: state => state.contactInfo,
  },
})

export const {
  addContactInfo,
  getContactsInfo,
  getContactInfoById,
  deleteContactInfo,
} = contactInfoSlice.actions

export const { selectContactsInfo, selectContactInfo } =
  contactInfoSlice.selectors
