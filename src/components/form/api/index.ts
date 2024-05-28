import type { AxiosError } from "axios"
import api from "../../../../axios.config"
import type { User } from "../../../features/auth/types/User"
import type { CareersFormData } from "../types/CareersFormData"
import type { WhoWeAreFormData } from "../types/WhoWeAreFormData"
import type { OurProjectData } from "../types/OurProjectData"

interface ErrorResponse {
  message: string
}

export async function updateUserFormRole(formData: User): Promise<User> {
  try {
    const response = await api.put("/change-role", formData)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>
    if (axiosError.response) {
      const message = axiosError.response.data.message
      throw new Error(message)
    } else {
      throw new Error("An unexpected error occurred")
    }
  }
}

export const addCareersCard = async (
  formData: CareersFormData,
): Promise<CareersFormData> => {
  const response = await api.post<CareersFormData>('/careers', formData)
  return response.data
}

export const getAllCareersCards = async (): Promise<CareersFormData[]> => {
  const response = await api.get<CareersFormData[]>('/careers')
  return response.data
}

export const getCareerCardById = async (id: number): Promise<CareersFormData> => {
  const response = await api.get<CareersFormData>(`/careers/${id}`)
  return response.data
}

export const deleteCareersCard = async (id: number): Promise<null> => {
  const response = await api.delete<null>(`/careers/${id}`)
  return response.data
}


export const addProjectCard = async (
  formData: OurProjectData,
): Promise<OurProjectData> => {
  const response = await api.post<OurProjectData>('/projects', formData)
  return response.data
}

export const getAllProjectCards = async (): Promise<OurProjectData[]> => {
  const response = await api.get<OurProjectData[]>('/projects')
  return response.data
}

export const getProjectCardById = async (id: number): Promise<OurProjectData> => {
  const response = await api.get<OurProjectData>(`/projects/${id}`)
  return response.data
}

export const deleteProjectCard = async (id: number): Promise<null> => {
  const response = await api.delete<null>(`/projects/${id}`)
  return response.data
}



export const addWhoWeAreCard = async (
  formData: WhoWeAreFormData,
): Promise<WhoWeAreFormData> => {
  const response = await api.post<WhoWeAreFormData>('/cards', formData)
  return response.data
}

export const getAllWhoWeAreCards = async (): Promise<WhoWeAreFormData[]> => {
  const response = await api.get<WhoWeAreFormData[]>('/cards')
  return response.data
}

export const getWhoWeAreCardById = async (id: number): Promise<WhoWeAreFormData> => {
  const response = await api.get<WhoWeAreFormData>(`/cards/${id}`)
  return response.data
}

export const deleteWhoWeAreCard = async (id: number): Promise<null> => {
  const response = await api.delete<null>(`/cards/${id}`)
  return response.data
}
