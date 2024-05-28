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
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
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
      await deleteContactInfo(id)
      toast.success(t("toasty.cardSuccessfully"))
    } catch (err) {
      toast.error(t("toasty.notUpdatedCard"))
    }
  }

  return (
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

      <Carousel
        responsive={{
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            partialVisibilityGutter: 40,
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            partialVisibilityGutter: 30,
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            partialVisibilityGutter: 30,
          },
        }}
      >
        <ul>
          {contactInfo?.map(card => (
            <li key={card.id}>
              <img src={card?.photo} alt={card.description} />
              <p>{card?.name}</p>
              <p>{card?.description}</p>
              <button onClick={() => handleDeleteCard(card.id!)}>
                {t("careers.deleteCard")}
              </button>
            </li>
          ))}
        </ul>
      </Carousel>
    </div>
  )
}

export default ContactInfo
