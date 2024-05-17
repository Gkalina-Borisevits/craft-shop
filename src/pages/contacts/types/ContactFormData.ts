export interface ContactFormData {
  name: string
  lastName: string
  email: string
  question: string
}

export interface ContactFormState {
  contactsData: ContactFormData | null
  loading: boolean
  error: string | null
}
