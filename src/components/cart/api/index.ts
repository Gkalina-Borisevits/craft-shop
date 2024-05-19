import type { CartItemProps } from "../types/CartItemProps";

export async function sendCartItems(products: CartItemProps[]): Promise<void> {
    try {
      const response = await fetch("/api/saveCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( products ),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save cart");
      }
  
      console.log("Cart saved !");
    } catch (error) {
      console.error("Error saving cart:", error);
      throw new Error("Error saving cart");
    }
  }