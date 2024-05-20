import { useTranslation } from "react-i18next"
import type { Product } from "../../features/products/types/Product"
import CartItem from "./CartItem"

interface CartProduct extends Product {
  cartQuantity: number
}

interface CartProps {
  products: CartProduct[]
}

const Cart: React.FC<CartProps> = ({ products }) => {
  const { t } = useTranslation("translation")

  const cartTotalAmount = (products: CartProduct[]): string => {
    return products
      .reduce(
        (total, product) =>
          total + parseFloat(product.price) * product.cartQuantity,
        0,
      )
      .toFixed(2)
  }

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="p-6">
              <CartItem
                product={{
                  id: product.id,
                  title: product.title,
                  price: parseFloat(product.price),
                  cartQuantity: product.cartQuantity,
                }}
              />
            </div>
          ))
        ) : (
          <span className="text-black text-center w-full block py-6">
            {t("text.cartIsEmpty")}
          </span>
        )}
      </div>

      {products.length > 0 && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">{t("menu.total")}:</span>
            <span className="text-lg font-bold text-black">
              {cartTotalAmount(products)} {t("menu.currency")}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
