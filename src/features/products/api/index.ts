import type { HomePageProduct } from "../types/HomePageProduct"

export async function addHomePageProduct(
  product: HomePageProduct,
): Promise<HomePageProduct> {
  const res = await fetch("/api/homepageProducts", {
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

export async function fetchHomePageProducts(): Promise<HomePageProduct[]> {
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
