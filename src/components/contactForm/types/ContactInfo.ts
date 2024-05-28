export interface ContactInfo {
  id?: number
  photo: File | undefined
  name: string
  description: string
}
export interface ContactInfoState {
  contactsInfo: ContactInfo[] | undefined
  contactInfo: ContactInfo | undefined
  loading: boolean
  error: string | null
}
