import type React from "react"
import { useAppDispatch } from "../../app/hooks"
import { useState } from "react"
import type { StoreProduct } from "./types/StoreProduct"
import { toast } from "react-toastify"
import { addNewStoreProduct } from "./storeProductSlice"
import styles from "./styles/StoreProductCreator.module.css"
import { useTranslation } from "react-i18next"

type FormElement = HTMLInputElement | HTMLTextAreaElement
type Props = {
  onClose: () => void
}

const StoreProductCreator: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation("translation")

  const dispatch = useAppDispatch()
  const [urlPreviews, setUrlPreviews] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ])

  const [formData, setFormData] = useState<StoreProduct>({
    id: "1",
    title: "",
    description: "",
    size: "",
    dimensions: "",
    material: "",
    price: "",
    imageFiles: [null, null, null, null],
  })

  const handleChange = (e: React.ChangeEvent<FormElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleFileChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        setUrlPreviews(prev => {
          const newPreviews = [...prev]
          newPreviews[index] = url
          return newPreviews
        })
      }
    }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Store Product add: ", formData)
    try {
      const productData = new FormData()
      productData.append("id", formData.id)
      productData.append("title", formData.title)
      productData.append("description", formData.description)
      productData.append("size", formData.size)
      productData.append("dimensions", formData.dimensions)
      productData.append("material", formData.material)
      productData.append("price", formData.price.toString())
      formData.imageFiles.forEach((file, index) => {
        if (file) {
          productData.append(`imageFile${index}`, file)
        }
      })

      dispatch(addNewStoreProduct(formData))
        .unwrap()
        .then(() => {
          toast.success("Store product added successfully")
          setFormData({
            id: "",
            title: "",
            description: "",
            size: "",
            dimensions: "",
            material: "",
            price: "",
            imageFiles: [null, null, null, null],
          })
          onClose()
          setUrlPreviews([null, null, null, null])
        })
    } catch (error) {
      toast.error("Failed to add store product")
    }
  }

  return (
    <div className="addCardContainer">
      <div className="container mx-auto p-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-black shadow-md rounded-lg p-6 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row md:items-start w-full">
            <div className="flex flex-col items-center md:w-1/3">
              <div className="mb-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange(0)}
                  id="file-upload-main"
                  className="hidden"
                />
                <label htmlFor="file-upload-main" className={styles.addImage}>
                  {t("storeProduct.file")}
                </label>
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
                  {urlPreviews[index] && (
                    <img
                      src={urlPreviews[index]}
                      alt={`Product Preview ${index + 1}`}
                      className="w-60 h-60 object-cover rounded-md shadow-md"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col md:w-1/2 md:ml-4 space-y-4 mt-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder={t("storeProduct.title")}
                className="mb-4 p-2 bg-black text-white border border-gray-300 rounded-md"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={t("storeProduct.description")}
                className="textarea-underline mb-4 p-2 bg-black text-white rounded-none"
                required
              />
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder={t("storeProduct.size")}
                className="mb-4 p-2 bg-black text-white border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                placeholder={t("storeProduct.dimensions")}
                className="mb-4 p-2 bg-black text-white border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                placeholder={t("storeProduct.material")}
                className="mb-4 p-2 bg-black text-white border border-gray-300 rounded-md"
                required
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder={t("storeProduct.price")}
                className="mb-4 p-2 bg-black text-white border border-gray-300 rounded-md"
                required
              />
              <button
                id="addCard"
                type="submit"
                className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                {t("storeProduct.buttonAddCard")}
              </button>
              <button
                id="closeWindow"
                onClick={onClose}
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

export default StoreProductCreator
