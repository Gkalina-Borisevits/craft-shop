import api from "../../../../axios.config"
import type { Product } from "../types/Product"

export async function addStoreProduct(formData: Product): Promise<Product> {
  try {
    const res = await api.post("/gallery", formData)

    return res.data
  } catch (error) {
    throw new Error("Failed to add store product")
  }
}

export async function fetchStoreProducts(): Promise<Product[]> {
  try {
    const res = await api.get("/gallery")

    return res.data
  } catch (error) {
    throw new Error("Failed to fetch store products")
  }
}

export async function fetchStoreProductById(id: string): Promise<Product> {
  try {
    const res = await api.get(`/gallery/${id}`)

    return res.data
  } catch (error) {
    throw new Error("Failed to fetch store product")
  }
}

export async function updateStateProduct(formData: Product): Promise<Product> {
  try {
    const res = await api.put("/gallery", formData)

    return res.data
  } catch (error) {
    throw new Error("Failed to update state product")
  }
}
export async function deleteStoreProductById(id: string): Promise<void> {
  try {
    await api.delete(`/gallery/${id}`)
  } catch (error) {
    throw new Error("Failed to delete store product")
  }
}