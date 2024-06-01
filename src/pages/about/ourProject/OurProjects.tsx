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
      await dispatch(deleteProject(id))
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

        <div className="flex flex-col flex-wrap justify-center items-center mr-4">
          {projectsForm
            ?.slice()
            .reverse()
            .map((project, index) => (
              <div
                key={project.id}
                className="w-full border-2 border-white m-2 rounded p-9 bg-gray-800"
              >
                <Carousel
                  responsive={responsive}
                  swipeable={false}
                  draggable={false}
                  showDots={true}
                  infinite={true}
                  autoPlay={true}
                  autoPlaySpeed={3000}
                  keyBoardControl={true}
                >
                  {project?.photos.map((photo, idx) => (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img
                      key={idx}
                      src={
                        photo instanceof File
                          ? URL.createObjectURL(photo)
                          : photo
                      }
                      alt={`Project ${idx + 1} Photo`}
                      className="mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 h-auto object-cover"
                    />
                  ))}
                </Carousel>
                <p className="text-white text-center p-2 mt-9">
                  {project?.description}
                </p>
                {viewProjectsForm && (
                  <button
                    id="delete-card"
                    onClick={() => handleDeleteCard(project.id!)}
                    className="mt-9 bg-red-400 text-white p-2 rounded hover:bg-red-600"
                  >
                    {t("careers.deleteCard")}
                  </button>
                )}
              </div>
            ))}
        </div>
        <div className={styles.logoCareers}>
          <img src={logo} alt="Logo" className="max-w-full mb-9 mt-9" />
        </div>
      </div>
    </>
  )
}

export default OurProjects
