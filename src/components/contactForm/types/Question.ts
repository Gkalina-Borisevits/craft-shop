export interface Question {
  id?: number
  photo: File | string
  description: string
  videoLink: string
}
export interface QuestionState {
  questions: Question[] | undefined
  question: Question | undefined
  loading: boolean
  error: string | null
}
