export interface OurProjectData {
  id?: number
  photos: File[]
  description: string
}
export interface ProjectState {
  projects: OurProjectData[] | null
  project: OurProjectData | null
  loading: boolean
  error: string | null
}
