import type { FC } from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import logo from "../../../assets/logo.png"
import styles from "./OurProjects.module.css"
import OurProjectForm from "../../../components/form/OurProjectForm"

const OurProjects: FC = () => {
  const { t } = useTranslation("translation")
  const [isAddingProduct, setIsAddingProduct] = useState(false)

  const handleAddProductClick = () => {
    setIsAddingProduct(true)
  }

  const handleCloseProductCreator = () => {
    setIsAddingProduct(false)
  }

  return (
    <>
      <div className={styles.careersContainer}>
        <div className={styles.buttonAddNewJob}>
          <button
            id="addCard"
            onClick={handleAddProductClick}
            className="mt-4 bg-blue-500 text-white p-2 hover:bg-yellow-500 "
          >
            {t("storeProduct.buttonAddCard")}
          </button>
          {isAddingProduct && (
            <OurProjectForm onClose={handleCloseProductCreator} />
          )}
        </div>
        <div className={styles.logoCareers}>
          <img src={logo} alt="Logo" className="max-w-full" />
        </div>
      </div>
    </>
  )
}

export default OurProjects
