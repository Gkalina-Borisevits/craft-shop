export interface CareersFormData {
  id?: number
  photo: string
  description: string
}

export interface CareersState {
  careers: CareersFormData[] | undefined
  career: CareersFormData | undefined
  loading: boolean
  error: string | null
}
