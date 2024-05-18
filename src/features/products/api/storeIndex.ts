import type { StoreProduct } from "../types/StoreProduct"

export async function addStoreProduct(
  formData: StoreProduct,
): Promise<StoreProduct> {
  const res = await fetch("/api/storeProducts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })

  if (!res.ok) {
    throw new Error("Failed to add store product")
  }

  return res.json()
}

export async function fetchStoreProducts(): Promise<StoreProduct[]> {
  const res = await fetch("/api/storeProducts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch store products")
  }

  return res.json()
}

export async function fetchStoreProductById(id: string): Promise<StoreProduct> {
  const res = await fetch(`/api/store-product/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch store products")
  }

  return res.json()
}
