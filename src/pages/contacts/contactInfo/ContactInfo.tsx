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

      <ul className="mt-4 text-white p-2 rounded flex flex-col items-center gap-6">
        {contactInfo?.map(card => (
          <li
            key={card.id}
            className="flex flex-col items-center justify-between border border-white w-1/2 p-4 m-2 rounded-lg bg-gray-800"
          >
            {card.photo && (
              <img
                src={
                  typeof card.photo === "string"
                    ? card.photo
                    : URL.createObjectURL(card.photo)
                }
                alt={card.description}
                className="w-64 h-64 object-cover mr-4"
              />
            )}
            <div className="flex flex-col justify-between flex-grow p-9">
              <p className="font-semibold p-3">{card?.name}</p>
              <p className="mb-4">{card?.description}</p>
              {viewContactForm && (
                <button
                  id="delete-card"
                  onClick={() => handleDeleteCard(card.id!)}
                  className="bg-red-400 text-white p-2 mt-9 rounded hover:bg-red-600 self-start sm:self-auto text-sm"
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
