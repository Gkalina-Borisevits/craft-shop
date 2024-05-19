import type { ProfileState, Profile } from "./types/Profile"
import { addNewProfile, fetchProfile } from "./api"
import { createAppSlice } from "../../app/createAppSlice"

const initialState: ProfileState = {
  profiles: [],
  profile: undefined,
  loading: false,
  error: null,
}

export const profileSlice = createAppSlice({
  name: "profile",

  initialState,

  reducers: create => ({
    addProfile: create.asyncThunk(
      async (formData: Profile) => {
        const response = await addNewProfile(formData)

        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          if (state.profiles) {
            state.profiles.push(action.payload)
          }
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    getProfile: create.asyncThunk(
      async _ => {
        const response = await fetchProfile()
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.profiles = action.payload.profiles
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

export const { addProfile, getProfile } = profileSlice.actions
export const { selectProfile } = profileSlice.selectors
