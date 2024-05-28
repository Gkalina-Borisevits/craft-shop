export interface OurProjectData {
  id?: number
  photos: string[]
  description: string
}
export interface ProjectState {
  projects: OurProjectData[] | undefined
  project: OurProjectData | undefined
  loading: boolean
  error: string | null
}
