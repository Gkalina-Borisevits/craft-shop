import { useEffect, useState, type FC } from "react"
import { useTranslation } from "react-i18next"
import styles from "./About.module.css"
import WhoWeAreForm from "../../../components/form/WhoWeAreForm"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectRole } from "../../../features/auth/userSlice"
import {
  deleteWhoWeAre,
  getWhoWeAre,
  selectWhoWeAres,
} from "../../../components/form/slice/whoWeAreSlice"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { toast } from "react-toastify"

const About: FC = () => {
  const [isAddingWhoWeAre, setIsAddingWhoWeAre] = useState(false)
  const { t } = useTranslation("translation")
  const role = useAppSelector(selectRole)
  const whoWeAreForm = useAppSelector(selectWhoWeAres)
  const dispatch = useAppDispatch()
  const viewWeAreForm = role === "ADMINISTRATOR" || role === "MODERATOR"

  useEffect(() => {
    dispatch(getWhoWeAre())
  }, [dispatch])

  const handleAddProductClick = () => {
    setIsAddingWhoWeAre(true)
  }

  const handleCloseProductCreator = () => {
    setIsAddingWhoWeAre(false)
  }

  const handleDeleteCard = async (id: number) => {
    try {
      await deleteWhoWeAre(id)
      toast.success(t("toasty.cardSuccessfully"))
    } catch (err) {
      toast.error(t("toasty.notUpdatedCard"))
    }
  }
  return (
    <>
      <div className={styles.buttonAddNewInfoCard}>
        {viewWeAreForm && (
          <>
            <button
              id="addCard"
              onClick={handleAddProductClick}
              className="mt-4 bg-blue-500 text-white p-2 hover:bg-yellow-500 rounded"
            >
              {t("storeProduct.buttonAddCard")}
            </button>
            {isAddingWhoWeAre && (
              <WhoWeAreForm onClose={handleCloseProductCreator} />
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
            {whoWeAreForm?.map(card => (
              <li key={card.id}>
                <img src={card?.photos} alt={card.description} />
                <p>{card?.description}</p>
                <button onClick={() => handleDeleteCard(card.id!)}>
                  {t("careers.deleteCard")}
                </button>
              </li>
            ))}
          </ul>
        </Carousel>
      </div>
    </>
  )
}

export default About
