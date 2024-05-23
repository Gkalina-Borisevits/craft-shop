import type { AxiosError } from "axios";
import api from "../../../../axios.config";
import type { User } from "../../../features/auth/types/User"

interface ErrorResponse {
  message: string;
}

export async function updateUserFormRole(formData: User): Promise<User> {
  try {
    const response = await api.put("/change-role", formData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      const message = axiosError.response.data.message; 
      throw new Error(message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}