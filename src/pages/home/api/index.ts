import type { Profile, ProfileState } from "../types/Profile"

export async function addNewProfile(
  product: Profile,
): Promise<Profile> {
  const res = await fetch("/api/homepage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })

  if (!res.ok) {
    throw new Error("Failed to add homepage product")
  }

  return res.json()
}

export async function fetchProfile(): Promise<ProfileState> {
  const res = await fetch("/api/homepageProducts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch homepage products")
  }

  return res.json()
}
