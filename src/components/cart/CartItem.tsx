import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../app/hooks";
import type { CartItemProps } from "./types/CartItemProps";
import { addToCart, deleteItemFromCart, removeOneItemFromCart } from "./cartSlice";
import "@fortawesome/fontawesome-free/css/all.min.css";

const CartItem: React.FC<CartItemProps> = ({ product }) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation("translation");
  
    const handleRemoveOne = () => {
      dispatch(removeOneItemFromCart(product.id));
    };
  
    const handleDelete = () => {
      dispatch(deleteItemFromCart(product.id));
    };
  
    const handleAddDish = () => {
      dispatch(addToCart(product));
    };
  
    if (!product || !product.title || !product.price || !product.cartQuantity) {
      return null;
    }
  
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-4">
        <div className="flex-1">
          <span className="text-lg font-bold">{product.title}, </span>
          <p className="text-sm text-gray-600">{t("menu.itemCost")}: {product.price}</p>
          <p className="text-sm text-gray-600">{t("menu.quantity")}: {product.cartQuantity}</p>
        </div>
        <div className="flex gap-2">
          <button
            className="p-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
            onClick={handleAddDish}>
            <i className="fas fa-plus"></i>
          </button>
          <button
            className="p-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded"
            onClick={handleRemoveOne}>
            <i className="fas fa-minus"></i>
          </button>
          <button
            className="p-2 text-white bg-red-500 hover:bg-red-600 rounded"
            onClick={handleDelete}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    );
  };
  export default CartItem;