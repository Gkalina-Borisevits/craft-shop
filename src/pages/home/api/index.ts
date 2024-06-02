import api from "../../../../axios.config"
import type { Profile} from "../types/Profile"

export async function updateProfilePage(
  name: string,
  formData: FormData,
): Promise<Profile> {
  try {
    const response = await api.put<Profile>(
      `/profile/card?name=${encodeURIComponent(name)}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    )
    return response.data
  } catch (error) {
    throw new Error("An unexpected error occurred")
  }
}

export async function fetchProfile(): Promise<Profile[]> {
  try {
    const response = await api.get<Profile[]>("/profile/cards")
    return response.data
  } catch (error) {
    throw new Error("Failed to fetch profiles")
  }
}
