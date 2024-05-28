import api from "../../../../axios.config"
import type { ContactFormData } from "../../../components/contactForm/types/ContactFormData"

export async function submitContactForm(
  formData: ContactFormData,
): Promise<void> {
  try {
    const response = await api.post("/contacts", formData)
    if (response.status >= 400) {
      const { message }: { message: string } = response.data
      throw new Error(message)
    }
    return response.data
  } catch (error) {
    throw new Error("Failed to submit contact form")
  }
}
