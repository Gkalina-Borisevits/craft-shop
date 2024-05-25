import { useState, type FC } from "react"
import styles from "./styles/Products.module.css"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../app/hooks"
import { selectRole } from "../auth/userSlice"
import { selectProducts } from "./productSlice"
import { Link } from "react-router-dom"
import "@fortawesome/fontawesome-free/css/all.min.css"
import ProductDetails from "./ProductDetails"

const Products: FC = () => {
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const { t } = useTranslation("translation")
  const role = useAppSelector(selectRole)
  const products = useAppSelector(selectProducts)

  const handleAddProductClick = () => {
    setIsAddingProduct(true)
  }

  const handleCloseProductCreator = () => {
    setIsAddingProduct(false)
  }

  const viewProductsForm = role === "ADMINISTRATOR" || role === "MODERATOR"

  return (
    <>
      {viewProductsForm && (
        <div className={styles.buttonAddNewImage}>
          <button
            id="addCard"
            onClick={handleAddProductClick}
            className="mt-4 bg-blue-400 text-white p-2 hover:bg-yellow-400 "
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
          {products?.map((product, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Product {index + 1}
              </h3>
             
                {product?.files?.map((file, fileIndex) => {
                  const isFourthImage = (fileIndex + 1) % 4 === 0
                  const imageSizeClass = isFourthImage
                    ? "w-44 h-44"
                    : "w-32 h-32"

                  const pagesUrl =
                    typeof file === "string" ? file : URL.createObjectURL(file)
                  return (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img
                      key={fileIndex}
                      src={pagesUrl}
                      alt={`Product ${index + 1} Image ${fileIndex + 1}`}
                      className={`${imageSizeClass} md:w-48 md:h-48 lg:w-64 lg:h-64 object-cover m-1 rounded`}
                    />
                  )
                })}
                 <Link
                to={`/products/${product.id}`}
                className="flex flex-wrap items-center justify-center bg-gray-300 p-2 rounded hover:bg-gray-400"
              >
                <i className="fas fa-eye text-gray-700 hover:text-white ml-2"></i>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Products
