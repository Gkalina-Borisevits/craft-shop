import type { User } from "../../../features/auth/types/User"

export async function updateUserFormRole(formData: User): Promise<User> {
  const res = await fetch("api/v1/change-role", {
    method: "PUT",
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
