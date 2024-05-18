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
import type { UserRoleData } from "../../components/form/types/UserRoleData"
import { updateUser } from "../../components/form/api"

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  role: null,
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
          state.isAuthenticated = true
          state.role = action.payload.role
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
      async (_, thunkApi) => {
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
          state.isAuthenticated = false
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    updateUserRole: create.asyncThunk(
      async (formData: UserRoleData) => {
        const response = await updateUser(formData)
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
    activateAccount: create.asyncThunk(
      async (validationCode: string) => {
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
    selectIsAuthenticated: state => state.isAuthenticated,
    selectRole: state => state.user?.role,
  },
})

export const { updateUserRole, login, registration, deleteUser, activateAccount } =
  userSlice.actions

export const { selectUser, selectRole, selectIsAuthenticated } =
  userSlice.selectors
