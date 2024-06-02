export interface WhoWeAreFormData {
  id?: number
  photos: File[]
  description: string
  videoLink: string
}
export interface WhoWeAreState {
  whoWeAres: WhoWeAreFormData[] 
  whoWeAre: WhoWeAreFormData 
  loading: boolean
  error: string | null
}
