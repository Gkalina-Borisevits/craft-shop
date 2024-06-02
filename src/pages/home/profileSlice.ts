import type { ProfileState } from "./types/Profile"
import { fetchProfile, updateProfilePage } from "./api"
import { createAppSlice } from "../../app/createAppSlice"

const initialState: ProfileState = {
  profiles: [],
  profile: null,
  loading: false,
  error: null,
}
interface ThunkArg {
  name: string
  formData: FormData
}

export const profileSlice = createAppSlice({
  name: "profile",

  initialState,

  reducers: create => ({
    updateProfile: create.asyncThunk(
      async ({ name, formData }: ThunkArg, thunkAPI) => {
        try {
          const response = await updateProfilePage(name, formData)
          return response
        } catch (error) {
          return thunkAPI.rejectWithValue("Failed to update profile")
        }
      },

      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          // state.profiles.push(action.payload)
          state.profile = action.payload
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    getProfile: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          const response = await fetchProfile()
          return response
        } catch (error) {
          return thunkAPI.rejectWithValue("Failed to fetch profiles")
        }
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.profiles = action.payload
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
  }),

  selectors: {
    selectProfile: state => state.profiles,
  },
})

export const { updateProfile, getProfile } = profileSlice.actions
export const { selectProfile } = profileSlice.selectors
