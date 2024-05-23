import api from "../../../../axios.config"
import type { Profile, ProfileState } from "../types/Profile"

export async function updateProfilePage(
  name: string,
  formData: ProfileState,
): Promise<Profile> {
  try {
    const response = await api.put<Profile>(
      `/profile/card?name=${encodeURIComponent(name)}`,
      formData,
    )
    return response.data
  } catch (error) {
    throw new Error("An unexpected error occurred")
  }
}

export async function fetchProfile(): Promise<ProfileState> {
  try {
    const response = await api.get("/profile/cards")

    return response.data
  } catch (error) {
    throw new Error("Failed to fetch homepage products")
  }
}
