import { createAppSlice } from "../../app/createAppSlice"
import type { User } from "./types/User"
import type { UserState } from "./types/UserState"
import {
  deletePersonalPageUser,
  getUserData,
  loginUser,
  logoutUser,
  personalPageUser,
  registerUser,
} from "./api"

import type { UserRoleData } from "../../components/form/types/UserRoleData"
import { updateUserFormRole } from "../../components/form/api"

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
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
      async (formData: User) => {
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
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    logout: create.asyncThunk(
      async (_, thunkApi) => {
        const response = await logoutUser()
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
    registration: create.asyncThunk(
      async (formData: User) => {
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
    getUser: create.asyncThunk(
      async (_, thunkApi) => {
        const response = await getUserData()
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
        const response = await updateUserFormRole(formData)
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
  }),

  selectors: {
    selectUser: state => state.user,
    selectIsAuthenticated: state => state.isAuthenticated,
    selectRole: state => state.user?.role,
  },
})

export const {
  updateUserRole,
  updateUser,
  login,
  logout,
  registration,
  deleteUser,
  getUser,
} = userSlice.actions

export const { selectUser, selectRole, selectIsAuthenticated } =
  userSlice.selectors
