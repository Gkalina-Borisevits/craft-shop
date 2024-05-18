import type { User } from "../../../features/auth/types/PersonalPageData"
import type { UserRoleData } from "../types/UserRoleData"

export async function updateUserFormRole(formData: UserRoleData): Promise<User> {
  const res = await fetch("/user", {
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
