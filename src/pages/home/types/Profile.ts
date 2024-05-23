export interface Profile {
  name?: string
  url?: string
  id?: string
  file?: File
  description?: string
}

export interface ProfileState {
  profiles: Profile[]
  loading: boolean
  error: string | null
}
