import { useState, type FC } from "react"
import StoreProductCreator from "./StoreProductCreator"
import styles from "./styles/Products.module.css"
import { useTranslation } from "react-i18next"

const Products: FC = () => {
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const { t } = useTranslation("translation")

  const handleAddProductClick = () => {
    setIsAddingProduct(true)
  }

  const handleCloseProductCreator = () => {
    setIsAddingProduct(false)
  }

  return (
    <>
      <div className={styles.buttonAddNewImage}>
        <button
          id="addCard"
          onClick={handleAddProductClick}
          className="mt-4 bg-blue-500 text-white p-2 hover:bg-yellow-500 "
        >
          {t("storeProduct.buttonAddCard")}
        </button>
        {isAddingProduct && (
          <StoreProductCreator onClose={handleCloseProductCreator} />
        )}
      </div>
    </>
  )
}

export default Products
