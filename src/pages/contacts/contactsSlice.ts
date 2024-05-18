import { createAppSlice } from "../../app/createAppSlice"
import type { ContactFormData, ContactFormState } from "./types/ContactFormData"
import { submitContactForm } from "./api"


const initialState: ContactFormState = {
  contactsData: null,
  loading: false,
  error: null,
}

export const ContactFormSlice = createAppSlice({
  name: "contactsData",
  initialState,
 
  reducers: create => ({
    sendContacts: create.asyncThunk(
      async (formData: ContactFormData) => {
        const response = await submitContactForm(formData)
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
    
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
  }),

  selectors: {
    selectContactForm: state => state.contactsData,
  },
})

export const { sendContacts } = ContactFormSlice.actions

export const { selectContactForm } = ContactFormSlice.selectors
