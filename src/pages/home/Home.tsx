import { useState, type FC } from "react"
import type { HomePageProduct } from "../../features/products/types/HomePageProduct"
import styles from "./Home.module.css"
import { useTranslation } from "react-i18next"
import logo from "../../assets/logo.png"

const Home: FC = () => {
  const { t } = useTranslation("translation")
  const [products, setProducts] = useState<HomePageProduct[]>([
    { id: "1", url: "", description: "" },
    { id: "2", url: "", description: "" },
    { id: "3", url: "", description: "" },
  ])
  const [files, setFiles] = useState<File[]>([])
  const [isAdmin, setIsAdmin] = useState<boolean>(true)

  const handleFileChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        const url = URL.createObjectURL(file)
        const updatedProducts = [...products]
        updatedProducts[index].url = url
        setProducts(updatedProducts)

        const updatedFiles = [...files]
        updatedFiles[index] = file
        setFiles(updatedFiles)
      }
    }

  const handleInputChange =
    (index: number, field: keyof HomePageProduct) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const updatedProducts = [...products]
      updatedProducts[index][field] = event.target.value
      setProducts(updatedProducts)
    }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData()

    products.forEach((product, index) => {
      formData.append(`products[${index}][id]`, product.id)
      formData.append(`products[${index}][description]`, product.description)
      if (files[index]) {
        formData.append(`products[${index}][file]`, files[index])
      }
    })
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      if (response.ok) {
        console.log("Data submitted successfully")
      } else {
        console.error("Error submitting data")
      }
    } catch (error) {
      console.error("Error submitting data", error)
    }
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.logoHome}>
        <img src={logo} alt="Logo" className="max-w-full" />
      </div>

      <div className="bg-black mt-8">
        <form
          onSubmit={handleSubmit}
          className="w-full p-4 shadow-md rounded-lg bg-black"
        >
          <div className="flex flex-col items-center w-full text-white bg-black">
            <div className="relative w-full lg:w-3/4 mx-auto">
              <input
                type="file"
                id="file-upload-0"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange(0)}
              />
              <label
                htmlFor="file-upload-0"
                className="absolute bottom-2 left-2 bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
              >
                {t("storeProduct.file")}
              </label>
              {products[0].url && (
                <img
                  src={products[0].url}
                  alt="Product"
                  className="w-24 h-auto absolute sm:w-24 md:w-40 lg:w-32 xl:w-48"
                />
              )}
            </div>
            <div className="mt-4 w-full lg:w-3/4 mx-auto bg-black">
              <textarea
                value={products[0].description}
                onChange={handleInputChange(0, "description")}
                placeholder="Product Description"
                className="w-full h-48 p-4 border border-gray-300 rounded text-white bg-black mt-12 text-right"
              />
            </div>
          </div>


          {/* 2 Product */}
          <div className="flex flex-col items-center w-full ">
            <div className="relative w-full lg:w-3/4 mx-auto flex lg:flex-row">
            <div className=" lg:w-1/4 bg-black"></div>
            <div className="flex-1 mt-4 lg:w-3/4">
                <textarea
                  value={products[1].description}
                  onChange={handleInputChange(1, "description")}
                  placeholder="Product Description"
                  className="w-full p-4 h-56 border border-gray-300 rounded"
                />
              </div>
              <div className="flex-1 relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange(1)}
                  id="file-upload-1"
                  className="hidden"
                />
                <label
                  htmlFor="file-upload-1"
                  className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
                >
                  {t("storeProduct.file")}
                </label>
                {products[1].url && (
                  <img
                    src={products[1].url}
                    alt="Product"
                    className="w-24 h-auto absolute right-0 top-0 z-100 sm:w-24 md:w-40 lg:w-32 xl:w-48"
                  />
                )}
              </div>
              
            </div>
          </div>
          <div className="w-full bg-black h-auto mx-auto my-4" style={{height: '80px'}}></div>

          {/* 3 Product */}
          <div className="flex flex-col items-center w-full text- black bg-white">
            <div className="relative w-full lg:w-3/4 mx-auto">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange(2)}
                id="file-upload-2"
                className="hidden"
              />
              <label
                htmlFor="file-upload-2"
                className="absolute bottom-2 left-2 bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
              >
                {t("storeProduct.file")}
              </label>
              {products[2].url && (
                <img
                  src={products[2].url}
                  alt="Product"
                  className="w-36 h-auto absolute sm:w-36 md:w-40 lg:w-32 xl:w-48"
                />
              )}
              <div className="mt-4 w-full lg:w-3/4 mx-auto">
                <textarea
                  value={products[2].description}
                  onChange={handleInputChange(2, "description")}
                  placeholder="Product Description"
                  className="w-full h-56 p-4 border border-gray-300 rounded text-black bg-white mt-12 text-right"
                />
              </div>
            </div>
          </div>
          {isAdmin && <button type="submit">Submit</button>}
        </form>
      </div>
    </div>
  )
}
//     <div className={styles.homeContainer}>
//       <div className={styles.logoHome}>
//             <img src={logo} alt="Logo" className="max-w-full" />
//           </div>
//     <div className="addCardContainer">
//       <div className="container mx-auto p-9 relative">
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col bg-black shadow-md rounded-lg p-6 relative"
//         >
//           <div className={styles.firstContainer}>
//           <div className="relative mb-4 ml-56">
//             <div className="flex flex-col md:flex-row md:items-start">
//               <div className="flex flex-col items-center md:w-1/3 relative">

//                 <div className="mb-4 ml-9">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange(0)}
//                     id="file-upload-0"
//                     className="hidden"
//                   />
//                   <label
//                     htmlFor="file-upload-0"
//                     className="bg-blue-500 text-white p-2 rounded cursor-pointer  "
//                   >
//                  {t("storeProduct.file")}
//                   </label>
//                   {products[0].url && (
//                     <img
//                       src={products[0].url}
//                       alt="Product"
//                       className="mt-2 absolute top-4 right-0 z-10 w-56"
//                     />
//                   )}
//                 </div>
//               </div>
//               </div>
//               <div className="flex flex-col md:w-2/3 md:ml-4 relative ">
//                 <textarea
//                   value={products[0].description}
//                   onChange={handleInputChange(0, "description")}
//                   placeholder="Product Description"
//                   className="mb-2 p-8 rounded border border-gray-300 bg-black text-white l-9 "
//                 />
//               </div>
//             </div>
//           </div>

//   {/* 2 Product */}
//          <div className={styles.twoContainer}>
//           <div className="relative mb-4 bg-white ml-56">
//             <div className="flex flex-col md:flex-row-reverse md:items-start">
//               <div className="flex flex-col items-center md:w-1/3 relative">
//                 <div className="mb-4 ml-9">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange(1)}
//                     id="file-upload-1"
//                     className="hidden"
//                   />
//                   <label
//                     htmlFor="file-upload-1"
//                     className="bg-blue-500 text-white p-2 rounded cursor-pointer"
//                   >
//                    {t("storeProduct.file")}
//                   </label>
//                   {products[1].url && (
//                     <img
//                       src={products[1].url}
//                       alt="Product"
//                       className="mt-2 absolute top-4 right-0 z-10 w-56"

//                     />
//                   )}
//                 </div>
//               </div>
//               </div>

//               <div className="flex flex-col md:w-2/3 md:mr-4 relative ">
//                 <textarea
//                   value={products[1].description}
//                   onChange={handleInputChange(1, "description")}
//                   placeholder="Product Description"
//                   className="mb-2 p-5 rounded border border-gray-300"
//                 />

//             </div>
//           </div>
//           </div>

//           {/* 3 Product */}
//           <div className={styles.threeContainer}>
//           <div className="relative mb-9">
//             <div className="flex flex-col md:flex-row md:items-start w-full">
//               <div className="flex flex-col items-center md:w-1/3 relative">
//                 <div className="mb-4 ml-8">
//                 <div className={styles.twoThree}></div>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange(2)}
//                     id="file-upload-2"
//                     className="hidden"
//                   />
//                   <label
//                     htmlFor="file-upload-2"
//                     className="bg-blue-500 text-white p-3 mr-7 rounded cursor-pointer"
//                   >
//                    {t("storeProduct.file")}
//                   </label>
//                   {products[2].url && (
//                     <img
//                       src={products[2].url}
//                       alt="Product"
//                       className="mt-9 max-w-xs absolute top-0 lg:left-40 z-10 w-72 h-auto lg:top-[-60px]"

//                     />
//                   )}
//                 </div>
//               </div>
//               <div className={styles.twoThree}></div>
//               <div className="flex flex-col md:w-2/3 md:ml-4 relative">
//                 <textarea
//                   value={products[2].description}
//                   onChange={handleInputChange(2, "description")}
//                   placeholder="Product Description"
//                   className="mb-2 p-5 rounded border border-gray-300 text-center h-400 w-full md:w-300"
//                 />
//               </div>
//               </div>
//             </div>
//           </div>

//           {isAdmin && (
//               <button type="submit" className="bg-green-500 text-white p-3 rounded mt-4">
//                 Submit
//               </button>
//             )}
//         </form>
//       </div>
//     </div>
//     </div>
//   )
// }

export default Home
