import { useAppSelector } from "../../app/hooks"
import { useTranslation } from "react-i18next"
import CartItem from "./CartItem"
import { useNavigate } from "react-router-dom"
import type { FC} from "react";
import { useState } from "react"
import { selectCartItems } from "./cartSlice"

const ProductCart: FC = () => {
  const products = useAppSelector(selectCartItems)

  const { t } = useTranslation("translation")
  const [isCartSent, setIsCartSent] = useState(false)
  const navigate = useNavigate()

  const goToPayment = () => {
    navigate(`/payment`)
  }
  const saveCart = async () => {
    if (products.length === 0) {
      alert(t("text.cartIsEmpty"))
      return
    }

    try {
      setIsCartSent(true)
    } catch (error) {
      console.error("Failed to send cart:", error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 bg-red-300">
      {products.map((product, index) => (
        <CartItem
        key={product.id}
        product={product}
         
        />
      ))}
      {products.length > 0 && (
        <div className="flex justify-center mt-6">
          {isCartSent ? (
            <button
              className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={goToPayment}
            >
              {t("menu.payOrder")}
            </button>
          ) : (
            <button
              className="bg-blue-400 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded"
              onClick={saveCart}
            >
              {t("menu.confirmOrder")}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
export default ProductCart
