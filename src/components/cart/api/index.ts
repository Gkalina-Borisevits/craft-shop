import api from "../../../../axios.config"
import type { CartItemProps } from "../types/CartItemProps"

export async function sendCartItems(products: CartItemProps[]): Promise<void> {
  try {
    const response = await api.post("/save-cart", products)

    if (response.status !== 200) {
      throw new Error("Failed to save cart")
    }

    console.log("Cart saved")
  } catch (error) {
    console.error("Error saving cart:", error)
    throw new Error("Error saving cart")
  }
}
