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
      await dispatch(deleteWhoWeAre(id))
      toast.success(t("toasty.deletedCard"))
    } catch (err) {
      toast.error(t("toasty.notUpdatedCard"))
    }
  }

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  }

  return (
    <div className={styles.aboutContainer}>
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
      </div>

      <ul className="flex flex-wrap justify-center gap-4 p-4 bg-black rounded-md gap-8 mt-9">
        {whoWeAreForm
          ?.slice()
          .reverse()
          .map(card => (
            <li
              key={card.id}
              className="flex flex-col items-center justify-center w-full md:w-1/3 p-4 bg-gray-800 text-white rounded-md mb-4 border border-white"
            >
              <div className="w-3/4">
                <Carousel
                  responsive={responsive}
                  swipeable={true}
                  draggable={true}
                  showDots={true}
                  infinite={true}
                  autoPlay={true}
                  autoPlaySpeed={9000}
                  keyBoardControl={true}
                  containerClass="carousel-container"
                  itemClass="carousel-item"
                >
                  {card?.photos?.map((photo, index) => (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img
                      key={index}
                      src={
                        photo instanceof File
                          ? URL.createObjectURL(photo)
                          : photo
                      }
                      alt={`Photo ${index + 1}`}
                      className="w-full h-auto object-cover rounded border border-white"
                    />
                  ))}
                </Carousel>
              </div>

              <div className="w-full flex flex-col items-center mt-9">
                <p className="mt-2 text-center font-semibold">
                  {card?.description}
                </p>
                {card?.videoLink && (
                  <a
                    href={card?.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-blue-500 hover:text-blue-700 block"
                  >
                    {t("whoWeAre.watchAVideo")}
                  </a>
                )}
                <button
                  id="delete-card"
                  onClick={() => handleDeleteCard(card.id!)}
                  className="mt-2 bg-red-500 text-white p-2 rounded hover:bg-red-600 block text-center md:text-left mt-9"
                >
                  {t("careers.deleteCard")}
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default About
