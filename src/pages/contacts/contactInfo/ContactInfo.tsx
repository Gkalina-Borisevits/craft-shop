import { useEffect, useState, type FC } from "react"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectRole } from "../../../features/auth/userSlice"
import {
  deleteContactInfo,
  getContactsInfo,
  selectContactsInfo,
} from "../../../components/contactForm/slice/contactInfoSlice"
import { toast } from "react-toastify"
import ContactInfoForm from "../../../components/contactForm/ContactInfoForm"
import styles from "./ContactInfo.module.css"

const ContactInfo: FC = () => {
  const [isAddingWhoWeAre, setIsAddingWhoWeAre] = useState(false)
  const { t } = useTranslation("translation")
  const role = useAppSelector(selectRole)
  const contactInfo = useAppSelector(selectContactsInfo)
  const dispatch = useAppDispatch()
  const viewContactForm = role === "ADMINISTRATOR" || role === "MODERATOR"

  useEffect(() => {
    dispatch(getContactsInfo())
  }, [dispatch])

  const handleAddProductClick = () => {
    setIsAddingWhoWeAre(true)
  }

  const handleCloseProductCreator = () => {
    setIsAddingWhoWeAre(false)
  }

  const handleDeleteCard = async (id: number) => {
    try {
      await dispatch(deleteContactInfo(id))
      toast.success(t("toasty.deletedCard"))
    } catch (err) {
      toast.error(t("toasty.notUpdatedCard"))
    }
  }

  return (
    <>
      <div className={styles.buttonAddNewInfoCard}>
        {viewContactForm && (
          <>
            <button
              id="addCard"
              onClick={handleAddProductClick}
              className="mt-4 bg-blue-500 text-white p-2 hover:bg-yellow-500 rounded"
            >
              {t("storeProduct.buttonAddCard")}
            </button>
            {isAddingWhoWeAre && (
              <ContactInfoForm onClose={handleCloseProductCreator} />
            )}
          </>
        )}
      </div>

      <ul className="mt-4 text-white p-2 rounded flex flex-col items-center ">
        {contactInfo?.map(card => (
          <li
            key={card.id}
            className="rounded-lg p-4 m-2 flex flex-col sm:flex-row items-center justify-center border border-white w-full px-4 "
          >
            <img
              src={card?.photo}
              alt={card.description}
              className="w-46 h-auto mr-14"
            />
            <div>
              <p className="font-semibold">{card?.name}</p>
              <p>{card?.description}</p>
              {viewContactForm && (
                <button
                  onClick={() => handleDeleteCard(card.id!)}
                  className="mt-2 bg-red-400 text-white p-2 rounded hover:bg-red-600"
                >
                  {t("careers.deleteCard")}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ContactInfo
