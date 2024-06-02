export interface CareersFormData {
  id?: number
  photo: File | null
  description: string
}

export interface CareersState {
  careers: CareersFormData[] | null
  career: CareersFormData | null
  loading: boolean
  error: string | null
}
