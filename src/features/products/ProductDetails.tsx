import type React from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useCallback, useEffect, useState } from "react"
import type { Product } from "./types/Product"
import { toast } from "react-toastify"
import { addNewProduct, selectProductById, updateProduct } from "./productSlice"
import styles from "./styles/ProductDetails.module.css"
import { useTranslation } from "react-i18next"
import { selectRole } from "../auth/userSlice"

type FormElement = HTMLInputElement | HTMLTextAreaElement
type Props = {
  onClose?: () => void
}



const ProductDetails: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation("translation")
  const role = useAppSelector(selectRole)
  const productById = useAppSelector(selectProductById)
  const viewUserRoleForm = role === "ADMINISTRATOR" || role === "MODERATOR"

  const [product, setProduct] = useState<Product>({
    id: 0,
    title: '',
    description: '',
    size: '',
    dimensions: '',
    material: '',
    price: 0,
    files: [],
    count: 0
  });

  const dispatch = useAppDispatch()
  const [urlPreviews, setUrlPreviews] = useState<(string | undefined)[]>([
    undefined,
    undefined,
    undefined,
    undefined,
  ])

  // const [formData, setFormData] = useState<Product>({
  //   id: 1,
  //   title: "",
  //   description: "",
  //   size: "",
  //   dimensions: "",
  //   material: "",
  //   price: "",
  //   files: [],
  //   count: "",
  // })

  // useEffect(() => {
  //   if (productById) {
  //     setFormData({
  //       id: productById.id || 1,
  //       title: productById.title || "",
  //       description: productById.description || "",
  //       size: productById.size || "",
  //       dimensions: productById.dimensions || "",
  //       material: productById.material || "",
  //       price: productById.price || "",
  //       count: productById.count || "",
  //       files: productById.files || [
  //         undefined,
  //         undefined,
  //         undefined,
  //         undefined,
  //       ],
  //     })
  //     setUrlPreviews(
  //       productById.files.map(file =>
  //         file ? URL.createObjectURL(file) : undefined,
  //       ),
  //     )
  //   } else {
  //     setFormData({
  //       id: 1,
  //       title: "",
  //       description: "",
  //       size: "",
  //       dimensions: "",
  //       material: "",
  //       price: "",
  //       count: "",
  //       files: [],
  //     })
  //     setUrlPreviews([undefined, undefined, undefined, undefined])
  //   }
  // }, [productById])

  const handleChange = (e: React.ChangeEvent<FormElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = useCallback(
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        const newUrlPreview = URL.createObjectURL(file)
  
        setUrlPreviews(prev => {
          const newPreviews = [...prev];
          newPreviews[index] = newUrlPreview
          console.log("Updated URL previews:", newPreviews)
          return newPreviews;
        });
  
        setProduct(prev => ({
          ...prev,
          files: [...prev.files.slice(0, index), file, ...prev.files.slice(index + 1)]
        }));
      }
    },
    []
  );

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
    
//     try {
//       const formData = new FormData();
//       formData.append("id", product.id.toString() || "")
//       formData.append("title", product.title || "")
//       formData.append("description", product.description || "")
//       formData.append("size", product.size || "")
//       formData.append("dimensions", product.dimensions || "")
//       formData.append("material", product.material || "")
//       formData.append("count", product.count.toString() || "")
//       formData.append("price", product.price.toString() || "")
//       product.files.forEach((file, index) => {
//         if (file instanceof File) {
//           formData.append(`files`, file);
//         }
//       });
//       for (let value of formData.entries()) {
//         console.log(value[0] + ', ' + value[1]);
//       }
// console.log("formData: ",formData)
//       if (!viewUserRoleForm) {
//         // Добавление в корзину для обычных пользователей
//         // dispatch(addToCart(formData.id))
//         //   .unwrap()
//         //   .then(() => {
//         //     toast.success("Product added to cart successfully");
//         //     onClose();
//         //   })
//         //   .catch(error => {
//         //     toast.error("Failed to add product to cart");
//         //   });
//       } else if (productById) {
//         dispatch(updateProduct(formData))
//           .unwrap()
//           .then(() => {
//             toast.success("Store product updated successfully")
//             if (onClose) {
//               onClose()
//             }
//           })
//           .catch(error => {
//             toast.error("Failed to update store product")
//           })
//       } else {
//         dispatch(addNewProduct(formData))
//           .unwrap()
//           .then(() => {
//             toast.success("Store product added successfully")
//             if (onClose) {
//               onClose()
//             }
//             setUrlPreviews([undefined, undefined, undefined, undefined])
//           })
          
//           .catch(error => {
//             toast.error("Failed to add store product")
//           })
//       }
//       // setFormData({
//       //   id: 0,
//       //   title: "",
//       //   description: "",
//       //   size: "",
//       //   dimensions: "",
//       //   material: "",
//       //   price: "",
//       //   files: [],
//       //   count: "",
//       // })
//     } catch (error) {
//       console.error("Failed add/update:", error)
//     }
//   }
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("id", product.id.toString() || "");
  formData.append("title", product.title || "");
  formData.append("description", product.description || "");
  formData.append("size", product.size || "");
  formData.append("dimensions", product.dimensions || "");
  formData.append("material", product.material || "");
  formData.append("count", product.count.toString() || "");
  formData.append("price", product.price.toString() || "");
  
  product.files.forEach((file, index) => {
    if (file) {
      formData.append(`files[${index}]`, file, file.name );
    }
  });
  
  for (let entry of formData.entries()) {
    console.log(entry[0], entry[1]);
  }

  try {
    const response = await dispatch(addNewProduct(formData)).unwrap();
    console.log("Product added successfully:", response);
    toast.success("Store product added successfully");
    if (onClose) {
      onClose();
    }
    setUrlPreviews([undefined, undefined, undefined, undefined]);
  } catch (error) {
    console.error("Failed to add the product:", error);
    toast.error("Failed to add store product");
  }
};

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
                value={product.title}
                onChange={handleChange}
                placeholder={t("storeProduct.title")}
                className="mb-4 p-2 bg-black text-white border border-gray-300 rounded-md"
                required
              />
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder={t("storeProduct.description")}
                className="textarea-underline mb-4 p-2 bg-black text-white rounded-none"
                required
              />
              <input
                type="text"
                name="size"
                value={product.size}
                onChange={handleChange}
                placeholder={t("storeProduct.size")}
                className="mb-4 p-2 bg-black text-white border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                name="dimensions"
                value={product.dimensions}
                onChange={handleChange}
                placeholder={t("storeProduct.dimensions")}
                className="mb-4 p-2 bg-black text-white border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                name="material"
                value={product.material}
                onChange={handleChange}
                placeholder={t("storeProduct.material")}
                className="mb-4 p-2 bg-black text-white border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder={t("storeProduct.price")}
                className="mb-4 p-2 bg-black text-white border border-gray-300 rounded-md"
                required
              />
              <input
                type="number"
                name="count"
                value={product.count}
                onChange={handleChange}
                placeholder={t("storeProduct.count")}
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

export default ProductDetails
