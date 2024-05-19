import type { FC } from "react"
import "@fortawesome/fontawesome-free/css/all.min.css"
import type { CartItemProps } from "./types/CartItemProps"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectProducts } from "../../features/products/productSlice"
import {
  addToCart,
  deleteItemFromCart,
  removeOneItemFromCart,
} from "./cartSlice"

const ProductInCart: FC<CartItemProps> = ({ product }) => {
  const products = useAppSelector(selectProducts)
  const isItemInCart = products.some(item => item.id === product.id)

  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  const handleRemoveOne = () => {
    dispatch(removeOneItemFromCart(product.id))
  }

  const handleDelete = () => {
    dispatch(deleteItemFromCart(product.id))
  }
  return (
    <div className="bg-white shadow-md rounded px-4 pt-4 pb-2 mb-4">
      {isItemInCart ? (
        <div className="flex space-x-2">
          <button
            onClick={handleAddToCart}
            className="text-blue-500 hover:text-blue-700"
          >
            <i className="fas fa-plus"></i>
          </button>
          <button
            onClick={handleRemoveOne}
            className="text-yellow-400 hover:text-blue-400"
          >
            <i className="fas fa-minus"></i>
          </button>
          <button
            onClick={handleDelete}
            className="text-red-400 hover:text-red-600"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="text-blue-400 hover:text-yellow-400"
        >
          <i className="fas fa-plus"></i>
        </button>
      )}
    </div>
  )
}

export default ProductInCart
