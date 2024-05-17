import { createAppSlice } from "../../app/createAppSlice"
import type { User } from "../../features/auth/types/PersonalPageData"
import type { UserState } from "./types/UserState"
import {
  activateAccountUser,
  deletePersonalPageUser,
  loginUser,
  personalPageUser,
  registerUser,
} from "./api"
import type { LoginData } from "./types/LoginData"
import type { RegistrationData } from "./types/RegistrationData"

const initialState: UserState = {
  user: null,
  status: "idle",
  loginData: null,
  registrationData: null,
  loading: false,
  error: null,
}

export const userSlice = createAppSlice({
  name: "user",
  initialState,

  reducers: create => ({
    updateUser: create.asyncThunk(
      async (formData: User) => {
        const response = await personalPageUser(formData)
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.user = action.payload
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    login: create.asyncThunk(
      async (formData: LoginData) => {
        const response = await loginUser(formData)
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.user = action.payload
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    registration: create.asyncThunk(
      async (formData: RegistrationData) => {
        const response = await registerUser(formData)
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.user = action.payload
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    deleteUser: create.asyncThunk(
      async(_, thunkApi )=> {
        const response = await deletePersonalPageUser()
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.user = null
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    activateAccount: create.asyncThunk(
      async (validationCode:  string) => {
        const response = await activateAccountUser(validationCode)
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
    selectUser: state => state.user,
  },
})

export const { updateUser, login, registration, deleteUser, activateAccount} = userSlice.actions

export const { selectUser } = userSlice.selectors
