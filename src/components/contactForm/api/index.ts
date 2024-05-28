import api from "../../../../axios.config"
import type { ContactInfo } from "../types/ContactInfo"
import type { Question } from "../types/Question"


export const addContactInfoCard = async (
    formData: ContactInfo,
  ): Promise<ContactInfo> => {
    const response = await api.post<ContactInfo>('/contact-info', formData)
    return response.data
  }
  
  export const getAllContactInfoCards = async (): Promise<ContactInfo[]> => {
    const response = await api.get<ContactInfo[]>('/contact-info')
    return response.data
  }
  
  export const getContactInfoCardById = async (id: number): Promise<ContactInfo> => {
    const response = await api.get<ContactInfo>(`/contact-info/${id}`)
    return response.data
  }
  
  export const deleteContactInfoCard = async (id: number): Promise<null> => {
    const response = await api.delete<null>(`/contact-info/${id}`)
    return response.data
  }

  export const addQuestionCard = async (
    formData: Question,
  ): Promise<Question> => {
    const response = await api.post<Question>('/contact-info', formData)
    return response.data
  }
  
  export const getAllQuestionCards = async (): Promise<Question[]> => {
    const response = await api.get<Question[]>('/contact-info')
    return response.data
  }
  
  export const getQuestionCardById = async (id: number): Promise<Question> => {
    const response = await api.get<Question>(`/contact-info/${id}`)
    return response.data
  }
  
  export const deleteQuestionCard = async (id: number): Promise<null> => {
    const response = await api.delete<null>(`/contact-info/${id}`)
    return response.data
  }
  