import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

interface CartItem {
  id: number
  title: string
  price: number
  cartQuantity: number
}

interface CartState {
  cartItems: CartItem[]
  cartTotalQuantity: number
  cartTotalAmount: number
  loading: boolean
  error: string | null
}

const initialState: CartState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems") ?? "[]"),
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  loading: false,
  error: null,
}

export const cartSlice = createAppSlice({
  name: "cart",

  initialState,

  reducers: create => ({
    addItemInCart: (state, action: PayloadAction<CartItem>) => {
      state.cartItems.push(action.payload)
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.cartItems.findIndex(
        item => item.id === action.payload.id,
      )

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1
      } else {
        const tempItem = { ...action.payload, cartQuantity: 1 }
        state.cartItems.push(tempItem)
      }
    },
    deleteItemFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload,
      )
    },
    removeOneItemFromCart: (state, action: PayloadAction<number>) => {
      const existingIndex = state.cartItems.findIndex(
        item => item.id === action.payload,
      )

      if (existingIndex >= 0) {
        if (state.cartItems[existingIndex].cartQuantity > 1) {
          state.cartItems[existingIndex].cartQuantity -= 1
        } else {
          state.cartItems.splice(existingIndex, 1)
        }
      }
    },
  }),

  selectors: {
    selectCartItems: state => state.cartItems,
  },
})

export const {
  addItemInCart,
  addToCart,
  deleteItemFromCart,
  removeOneItemFromCart,
} = cartSlice.actions

export const { selectCartItems } = cartSlice.selectors
