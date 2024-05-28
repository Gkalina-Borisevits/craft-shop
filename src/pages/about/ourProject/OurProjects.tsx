import type { FC } from "react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import logo from "../../../assets/logo.png"
import styles from "./OurProjects.module.css"
import OurProjectForm from "../../../components/form/OurProjectForm"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectRole } from "../../../features/auth/userSlice"
import {
  deleteProject,
  getProjects,
  selectProjects,
} from "../../../components/form/slice/projectsSlice"
import { toast } from "react-toastify"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

const OurProjects: FC = () => {
  const { t } = useTranslation("translation")
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const role = useAppSelector(selectRole)
  const projectsForm = useAppSelector(selectProjects)
  const dispatch = useAppDispatch()
  const viewProjectsForm = role === "ADMINISTRATOR" || role === "MODERATOR"

  useEffect(() => {
    dispatch(getProjects())
  }, [dispatch])

  const handleAddProductClick = () => {
    setIsAddingProduct(true)
  }

  const handleCloseProductCreator = () => {
    setIsAddingProduct(false)
  }
  const handleDeleteCard = async (id: number) => {
    try {
      await deleteProject(id)
      toast.success(t("toasty.cardSuccessfully"))
    } catch (err) {
      toast.error(t("toasty.notUpdatedCard"))
    }
  }

  return (
    <>
      <div className={styles.careersContainer}>
        {viewProjectsForm && (
          <div className={styles.buttonAddNewJob}>
            <button
              id="addCard"
              onClick={handleAddProductClick}
              className="mt-4 bg-blue-500 text-white p-2 hover:bg-yellow-500 rounded"
            >
              {t("storeProduct.buttonAddCard")}
            </button>
            {isAddingProduct && (
              <OurProjectForm onClose={handleCloseProductCreator} />
            )}
          </div>
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
            {projectsForm?.map(card => (
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
        <div className={styles.logoCareers}>
          <img src={logo} alt="Logo" className="max-w-full" />
        </div>
      </div>
    </>
  )
}

export default OurProjects
