import { useEffect, useState, type FC } from "react"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectProductById } from "./productSlice"
import { toast } from "react-toastify"

type Props = {
    onClose?: () => void
  }

const ProductCard: FC<Props> = ({ onClose }) => {
    const { t } = useTranslation("translation")
    const productById = useAppSelector(selectProductById)
    const dispatch = useAppDispatch();
    const [urlPreviews, setUrlPreviews] = useState<(string | undefined)[]>(Array(4).fill(undefined));

    useEffect(() => {
        if (productById) {
            setUrlPreviews(productById.imageFiles.map(file => (file ? URL.createObjectURL(file) : undefined)));
        }
      }, [productById]);
    
      const handleAddToCart = () => {
        if (productById) {
            // dispatch(addToCart(productById.id))
            //   .unwrap()
            //   .then(() => {
            //     toast.success('Product added to cart successfully');
            //     if (onClose) {
            //       onClose();
            //     }
            //   })
            //   .catch(error => {
            //     toast.error('Failed to add product to cart');
            //   });
          }
        };
      

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-start w-full">
          <div className="flex flex-col items-center md:w-1/3">
            <div className="mb-4">
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
              <div key={index} className="flex-1 mb-4">
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
            <h2 className="text-2xl font-bold mb-2">{productById?.title}</h2>
            <p className="mb-2">{productById?.description}</p>
            <p className="mb-2"><strong>{t('storeProduct.size')}:</strong> {productById?.size}</p>
            <p className="mb-2"><strong>{t('storeProduct.dimensions')}:</strong> {productById?.dimensions}</p>
            <p className="mb-2"><strong>{t('storeProduct.material')}:</strong> {productById?.material}</p>
            <p className="mb-2"><strong>{t('storeProduct.price')}:</strong> ${productById?.price}</p>
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              {t('storeProduct.buttonAddCard')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProductCard
