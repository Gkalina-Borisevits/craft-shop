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
         <ul className="flex flex-col items-center bg-black p-4 rounded-md border border-white">
            {whoWeAreForm?.map(card => (
              <li key={card.id} className="bg-gray-800 text-white p-4 rounded mb-4 flex items-center">
                <div className="w-1/3">

                  {card?.photos?.map((photo, index) => (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img
                      key={index}
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-auto object-cover rounded border border-white"
                    />
                  ))}
                 
                </div>
                
                <div className="w-2/3 ml-4">
                  <p className="text-center font-semibold">{card?.description}</p>
                  {card?.videoLink && (
                    <a href={card?.videoLink} target="_blank" rel="noopener noreferrer" className="mt-2 text-blue-500 hover:text-blue-700">
                       {card.description}
                    </a>
                )}
                  <button
                    onClick={() => handleDeleteCard(card.id!)}
                    className="mt-2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    {t("careers.deleteCard")}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Carousel>
      
    </div>
  )
}

export default About
