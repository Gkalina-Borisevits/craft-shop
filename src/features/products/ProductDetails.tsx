import type React from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useCallback, useEffect, useState } from "react"
import type { Product } from "./types/Product"
import { toast } from "react-toastify"
import {
  addNewProduct,
  getProductById,
  selectProductById,
  updateProduct,
} from "./productSlice"
import styles from "./styles/ProductDetails.module.css"
import { useTranslation } from "react-i18next"
import { selectRole } from "../auth/userSlice"
import { useNavigate, useParams } from "react-router-dom"
import { addToCart } from "../../components/cart/cartSlice"

type FormElement = HTMLInputElement | HTMLTextAreaElement
type Props = {
  onClose?: () => void
}

const ProductDetails: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation("translation")
  const { id } = useParams()
  const role = useAppSelector(selectRole)
  const productById = useAppSelector(selectProductById)
  const viewUserRoleForm = role === "ADMINISTRATOR" || role === "MODERATOR"
  const navigate = useNavigate()

  const [product, setProduct] = useState<Product>({
    id: 0,
    title: "",
    description: "",
    size: "",
    dimensions: "",
    material: "",
    price: 0,
    files: [],
    count: 0,
    pagesUrl: [],
  })

  const dispatch = useAppDispatch()
  const [urlPreviews, setUrlPreviews] = useState<(string | undefined)[]>([
    undefined,
    undefined,
    undefined,
    undefined,
  ])

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (productById) {
      console.log("productById:", productById)
      const urls = productById.pagesUrl || []
      setProduct({
        id: productById.id || 1,
        title: productById.title || "",
        description: productById.description || "",
        size: productById.size || "",
        dimensions: productById.dimensions || "",
        material: productById.material || "",
        price: productById.price || 0,
        count: productById.count || 0,
        files: productById.files || [],
      })

      const filePreviews = (productById.files || []).map(file =>
        file ? URL.createObjectURL(file) : undefined,
      )
      const urlPreviews = urls.map(url => url || undefined)

      setUrlPreviews([...filePreviews, ...urlPreviews])
      return () => {
        filePreviews.forEach(url => {
          if (url) URL.revokeObjectURL(url)
        })
      }
    } else {
      setProduct({
        id: 1,
        title: "",
        description: "",
        size: "",
        dimensions: "",
        material: "",
        price: 0,
        count: 0,
        files: [],
      })
      setUrlPreviews([])
    }
  }, [productById])

  const handleChange = (e: React.ChangeEvent<FormElement>) => {
    const { name, value } = e.target
    setProduct(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = useCallback(
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0]
        const newUrlPreview = URL.createObjectURL(file)

        setUrlPreviews(prev => {
          const newPreviews = [...prev]
          newPreviews[index] = newUrlPreview
          console.log("Updated URL previews:", newPreviews)
          return newPreviews
        })

        setProduct(prev => {
          if (!prev.files) {
            return prev
          }

          return {
            ...prev,
            files: [
              ...prev.files.slice(0, index),
              file,
              ...prev.files.slice(index + 1),
            ],
          }
        })
      }
    },
    [],
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    if (product.id === undefined) {
      return
    }
    formData.append("id", product.id.toString())
    formData.append("title", product.title || "")
    formData.append("description", product.description || "")
    formData.append("size", product.size || "")
    formData.append("dimensions", product.dimensions || "")
    formData.append("material", product.material || "")
    formData.append("count", (product.count ?? 0).toString())
    formData.append("price", (product.price ?? 0).toString())

    if (product.files) {
      product.files.forEach((file, index) => {
        if (file) {
          formData.append(`files[${index}]`, file, file.name)
        }
      })
    }

    try {
      if (productById) {
        dispatch(updateProduct({ formData }))
          .unwrap()
          .then(() => {
            toast.success(t("toasty.updateCard"))
            if (onClose) {
              onClose()
            }
          })
          .catch(error => {
            toast.error(t("toasty.notUpdatedCard"))
          })
      } else {
        await dispatch(addNewProduct({ formData })).unwrap()
        toast.success(t("toasty.cardSuccessfully"))
        if (onClose) {
          onClose()
        }
        setUrlPreviews([undefined, undefined, undefined, undefined])
      }
    } catch (error) {
      toast.error(t("toasty.notUpdatedCard"))
    }
  }

  const handleNavigate = () => {
    navigate("/products")
  }

  const addCardToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!product.id || !product.title || product.price === undefined) {
      toast.error(t("toasty.addedToCart"))
      return
    }
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        cartQuantity: 1,
      }),
    )
    toast.success(t("toasty.addedToCart"))
  }

  return (
    <div className={styles.addCardContainer}>
      <div className="container mx-auto p-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-black shadow-md rounded-lg p-6 border border-gray-100 mt-9"
        >
          <div className="flex flex-col md:flex-row md:items-start w-full">
            <div className="flex flex-col items-center md:w-1/3">
              <div className="mb-4">
                {viewUserRoleForm && (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange(0)}
                      id="file-upload-main"
                      className="hidden"
                    />

                    <label
                      htmlFor="file-upload-main"
                      className={styles.addImage}
                    >
                      {t("storeProduct.file")}
                    </label>
                  </>
                )}
                {urlPreviews[0] && (
                  <img
                    src={urlPreviews[0]}
                    alt="Main Product Preview"
                    className="w-full h-116 object-cover rounded-md shadow-md"
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col md:w-1/3 md:ml-12 space-y-4">
              {[1, 2, 3].map(index => (
                <div key={index} className="flex-1">
                  {viewUserRoleForm && (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange(index)}
                        id={`file-upload-${index}`}
                        className="hidden"
                      />
                      <label
                        htmlFor={`file-upload-${index}`}
                        className={styles.addImage}
                      >
                        {t("storeProduct.file")}
                      </label>
                    </>
                  )}
                  {urlPreviews[index] && (
                    <img
                      src={urlPreviews[index]}
                      alt={`Product Preview ${index + 1}`}
                      className="w-41 h-41 object-cover rounded-md shadow-md"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col md:w-1/2 md:ml-4 space-y-4 mt-4">
              <p className="text-gray-600 text-left">
                {t("storeProduct.title")}:
              </p>
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
                placeholder={t("storeProduct.title")}
                className="mb-4 p-2 bg-black text-white border border-gray-300 rounded-md"
                required
              />
              <p className="text-gray-600 text-left">
                {t("storeProduct.description")}:
              </p>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder={t("storeProduct.description")}
                className="textarea-underline mb-4 p-2 bg-black text-white rounded-none"
                required
              />
              <p className="text-gray-600 text-left">
                {t("storeProduct.size")}:
              </p>
              <input
                type="text"
                name="size"
                value={product.size}
                onChange={handleChange}
                placeholder={t("storeProduct.size")}
                className="mb-4 p-2 bg-black text-white border border-gray-300 rounded-md"
                required
              />
              <p className="text-gray-600 text-left">
                {t("storeProduct.dimensions")}:
              </p>
              <input
                type="text"
                name="dimensions"
                value={product.dimensions}
                onChange={handleChange}
                placeholder={t("storeProduct.dimensions")}
                className="mb-4 p-2 bg-black text-white border border-gray-300 rounded-md"
                required
              />
              <p className="text-gray-600 text-left">
                {t("storeProduct.material")}:
              </p>
              <input
                type="text"
                name="material"
                value={product.material}
                onChange={handleChange}
                placeholder={t("storeProduct.material")}
                className="mb-4 p-2 bg-black text-white border border-gray-300 rounded-md"
                required
              />
              <p className="text-gray-600 text-left">
                {t("storeProduct.price")} - $ :
              </p>
              <input
                type="text"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder={t("storeProduct.price")}
                className="mb-4 p-2 bg-black text-white border border-gray-300 rounded-md"
                required
              />
              <p className="text-gray-600 text-left">
                {t("storeProduct.count")}:
              </p>
              <input
                type="number"
                name="count"
                value={product.count}
                onChange={handleChange}
                placeholder={t("storeProduct.count")}
                className="mb-4 p-2 bg-black text-white border border-gray-300 rounded-md"
                required
              />
              {viewUserRoleForm ? (
                <button
                  id="add-card"
                  type="submit"
                  className="bg-indigo-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  {productById
                    ? t("storeProduct.buttonUpdateCard")
                    : t("storeProduct.buttonAddCard")}
                </button>
              ) : null}

              <button
                id="add-to-cart"
                onClick={addCardToCart}
                type="button"
                className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                {t("storeProduct.addToCart")}
              </button>

              <button
                id="close-window"
                onClick={productById ? handleNavigate : onClose}
                className="mt-4 bg-yellow-400 text-white p-2 rounded-md hover:bg-yellow-600 transition duration-200"
              >
                {t("storeProduct.closeForm")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductDetails
