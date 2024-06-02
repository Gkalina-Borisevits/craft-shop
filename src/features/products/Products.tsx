import { useEffect, useState, type FC } from "react"
import styles from "./styles/Products.module.css"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectRole } from "../auth/userSlice"
import { getProducts, selectProducts } from "./productSlice"
import { Link } from "react-router-dom"
import "@fortawesome/fontawesome-free/css/all.min.css"
import ProductDetails from "./ProductDetails"

const Products: FC = () => {
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const { t } = useTranslation("translation")
  const role = useAppSelector(selectRole)
  const products = useAppSelector(selectProducts)
  const dispatch = useAppDispatch()

  const handleAddProductClick = () => {
    setIsAddingProduct(true)
  }

  const handleCloseProductCreator = () => {
    setIsAddingProduct(false)
  }
  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const viewProductsForm = role === "ADMINISTRATOR" || role === "MODERATOR"

  return (
    <>
      {viewProductsForm && (
        <div className={styles.buttonAddNewImage}>
          <button
            id="addCard"
            onClick={handleAddProductClick}
            className="mt-4 bg-blue-400 text-white p-2 hover:bg-yellow-400 rounded-md mb-3"
          >
            {t("storeProduct.buttonAddCard")}
          </button>
          {isAddingProduct && (
            <ProductDetails onClose={handleCloseProductCreator} />
          )}
        </div>
      )}
      <div>
        <div className="container mx-auto px-4">
          <ul className="flex flex-wrap ml-9 gap-9 mt-12">
            {products?.map((product, index) => {
              const isFourth = (index + 1) % 3 === 0
              const imageSizeClass = isFourth
                ? "w-44 h-44 md:w-56 md:h-56 lg:w-72 lg:h-72"
                : "w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64"

              return (
                <li key={product.id} className="mb-8">
                  <Link to={`/products/${product.id}`}>
                    {product?.pagesUrl && product.pagesUrl.length > 0 ? (
                      <img
                        src={product.pagesUrl[0]}
                        alt={product.title}
                        className={`${imageSizeClass} object-cover m-1 rounded`}
                      />
                    ) : (
                      <div
                        className={`${imageSizeClass} object-cover m-1 rounded bg-gray-200 flex items-center justify-center`}
                      >
                        <span>No Image</span>
                      </div>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Products
