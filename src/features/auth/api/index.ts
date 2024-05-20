import type { User } from "../types/User"

export async function personalPageUser(formData: User): Promise<User> {
  const res = await fetch("api/v1/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
  if (res.status >= 400) {
    const { message }: { message: string } = await res.json()
    throw new Error(message)
  }
  return res.json()
}
export async function loginUser(formData: User): Promise<User> {
  const res = await fetch("api/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
  if (res.status >= 400) {
    const { message }: { message: string } = await res.json()
    throw new Error(message)
  }
  return res.json()
}

export async function user(): Promise<{
  id: number
  name: string
  email: string
  role: string
}> {
  const res = await fetch("/api/v1/user/")
  if (res.status >= 400) {
    const { message }: { message: string } = await res.json()
    throw new Error(message)
  }
  return res.json()
}

export async function registerUser(formData: User): Promise<User> {
  const res = await fetch("api/v1/registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
  interface Error {
    message: string
    field: string
    rejectedValue: string
  }
  if (res.status >= 400) {
    const { errors }: { errors: Error[] } = await res.json()
    errors.forEach(err => {
      throw new Error(`${err.field} ${err.rejectedValue} ${err.message}`)
    })
  }
  return res.json()
}

export async function deletePersonalPageUser(): Promise<void> {
  const res = await fetch("api/v1/user", {
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

export async function activateAccountUser(
  validationCode: string,
): Promise<User> {
  const res = await fetch("/api/activate", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ validationCode }),
  })
  interface Error {
    message: string
    field: string
    rejectedValue: string
  }
  if (res.status >= 400) {
    const { errors }: { errors: Error[] } = await res.json()
    errors.forEach(err => {
      throw new Error(`${err.field} ${err.rejectedValue} ${err.message}`)
    })
  }
  return res.json()
}
export async function logoutUser(): Promise<void> {
  const res = await fetch("api/v1/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (!res.ok) {
    throw new Error("Failed to loGOUT")
  }
  return res.json()
}
export async function getUserData(): Promise<User> {
  const res = await fetch("api/v1/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (!res.ok) {
    throw new Error("Failed to loGOUT")
  }
  return res.json()
}
