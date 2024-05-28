export interface WhoWeAreFormData {
  id?: number
  photos: string[]
  description: string
  videoLink: string
}
export interface WhoWeAreState {
  whoWeAres: WhoWeAreFormData[] | undefined
  whoWeAre: WhoWeAreFormData | undefined
  loading: boolean
  error: string | null
}
