import { createAppSlice } from "../../../app/createAppSlice"
import {
  addProjectCard,
  deleteProjectCard,
  getAllProjectCards,
  getProjectCardById,
} from "../api"
import type { ProjectState } from "../types/OurProjectData"

const initialState: ProjectState = {
  projects: [],
  project: null,
  loading: false,
  error: null,
}

interface ThunkArg {
  formData: FormData
}

export const projectSlice = createAppSlice({
  name: "projects",
  initialState,

  reducers: create => ({
    addProject: create.asyncThunk(
      async ({ formData }: ThunkArg, thunkAPI) => {
        const response = await addProjectCard(formData)
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.project = action.payload
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    getProjects: create.asyncThunk(
      async (_, thunkApi) => {
        const response = await getAllProjectCards()
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.projects = action.payload
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    getProjectById: create.asyncThunk(
      async (id: number, thunkApi) => {
        const response = await getProjectCardById(id)
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.project = action.payload
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    deleteProject: create.asyncThunk(
      async (id: number, thunkAp) => {
        const response = await deleteProjectCard(id)
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.project = null
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
  }),

  selectors: {
    selectProjects: state => state.projects,
    selectProject: state => state.project,
  },
})

export const { addProject, getProjects, getProjectById, deleteProject } =
  projectSlice.actions

export const { selectProjects, selectProject } = projectSlice.selectors
