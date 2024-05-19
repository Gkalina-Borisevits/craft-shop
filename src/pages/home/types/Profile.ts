export interface Profile {
  id: string
  image: File
  description: string
}

export interface ProfileState {
  profiles: Profile[] 
  profile: Profile | undefined
  loading: boolean
  error: string | null
}
