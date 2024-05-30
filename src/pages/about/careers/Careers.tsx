import { useEffect, useState, type FC } from "react"
import { useTranslation } from "react-i18next"
import CareersForm from "../../../components/form/CareersForm"
import styles from "./Careers.module.css"
import logo from "../../../assets/logo.png"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectRole } from "../../../features/auth/userSlice"
import {
  deleteCareer,
  getCareers,
  selectCareers,
} from "../../../components/form/slice/careersSlise"
import { toast } from "react-toastify"

const Careers: FC = () => {
  const { t } = useTranslation("translation")
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const role = useAppSelector(selectRole)
  const careersForm = useAppSelector(selectCareers)
  const dispatch = useAppDispatch()
  const viewCareersForm = role === "ADMINISTRATOR" || role === "MODERATOR"

  useEffect(() => {
    dispatch(getCareers())
  }, [dispatch])

  const handleAddProductClick = () => {
    setIsAddingProduct(true)
  }

  const handleCloseProductCreator = () => {
    setIsAddingProduct(false)
  }

  const handleDeleteCard = async (id: number) => {
    try {
      await dispatch(deleteCareer(id))
      toast.success(t("toasty.deletedCard"))
    } catch (err) {
      toast.error(t("toasty.notUpdatedCard"))
    }
  }

  return (
    <>
      <div className={styles.careersContainer}>
        {viewCareersForm && (
          <div className={styles.buttonAddNewJob}>
            <button
              id="addCard"
              onClick={handleAddProductClick}
              className="mt-4 bg-blue-500 text-white p-2 hover:bg-yellow-500 rounded"
            >
              {t("storeProduct.buttonAddCard")}
            </button>
            {isAddingProduct && (
              <CareersForm onClose={handleCloseProductCreator} />
            )}
          </div>
        )}

        <ul className="flex flex-col">
          {careersForm?.map(card => (
            <li
              key={card.id}
              className="bg-gray-800 text-white p-4 rounded mb-4 flex flex-col sm:flex-row items-center"
            >
              <div className="flex justify-center items-center mb-4 sm:mb-0 sm:mr-4">
                <img src={card?.photo} alt={card.description} />
              </div>
              <div className="w-full sm:w-2/3">
                <p className="text-center sm:text-left font-semibold">
                  {card?.description}
                </p>
                {viewCareersForm && (
                  <button
                    onClick={() => handleDeleteCard(card.id!)}
                    className="mt-9 bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    {t("careers.deleteCard")}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.logoCareers}>
          <img src={logo} alt="Logo" className="max-w-full" />
        </div>
      </div>
    </>
  )
}

export default Careers
