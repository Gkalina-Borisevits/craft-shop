import axios from "axios"
import type { User } from "../types/User"
import api from "../../../../axios.config"

export async function personalPageUser(formData: User): Promise<User> {
  try {
    const response = await api.put("/user", formData);
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      
      const message = error.response.data.message;
      throw new Error(message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}

export async function loginUser(formData: User): Promise<User> {
  try {
    const response = await api.post("/login", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.data
  } catch (error: unknown) {
    const axiosError = error as { response?: { data: { message: string } } };
    if (axiosError.response) {
      const message = axiosError.response.data.message;
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}

interface APIError {
  message: string;
  field?: string;      
  rejectedValue?: any; 
}

export async function registerUser(formData: User): Promise<User> {
  try {
    const response = await api.post("/registration", formData);
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      
      const errors: APIError[] = error.response.data.errors;
      if (errors && errors.length > 0) {
       
       
        const errorMessage = errors.map(err => `${err.field} ${err.rejectedValue} ${err.message}`).join(", ");
        throw new Error(errorMessage);
      }
      throw new Error("Registration failed with unknown error");
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}

export async function deletePersonalPageUser(): Promise<void> {
  const res = await fetch("/user", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (!res.ok) {
    throw new Error("Failed to delete")
  }
  return res.json()
}

export async function logoutUser(): Promise<void> {
  try {
    await api.get("/logout")
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Failed to logout")
    } else throw new Error("An unexpected error occurred")
  }
}

export async function getUserData(): Promise<User> {
  try {
    const response = await api.get("/user")
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Failed to get user data")
    } else {
      throw new Error("An unexpected error occurred")
    }
  }
}
