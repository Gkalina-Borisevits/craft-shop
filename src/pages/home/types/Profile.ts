export interface Profile {
  name?: string
  url?: string
  id?: string
  file?: File
  description?: string
}

export interface ProfileState {
  profiles: Profile[]
  profile: Profile | null
  loading: boolean
  error: string | null
}
