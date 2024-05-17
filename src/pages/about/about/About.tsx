import { useState, type FC } from "react"
import { useTranslation } from "react-i18next"
import styles from "./About.module.css"
import WhoWeAreForm from "../../../components/form/WhoWeAreForm"

const About: FC = () => {
  const [isAddingWhoWeAre, setIsAddingWhoWeAre] = useState(false)
  const { t } = useTranslation("translation")

  const handleAddProductClick = () => {
    setIsAddingWhoWeAre(true)
  }

  const handleCloseProductCreator = () => {
    setIsAddingWhoWeAre(false)
  }
  return (
    <>
      <div className={styles.buttonAddNewInfoCard}>
        <button
          id="addCard"
          onClick={handleAddProductClick}
          className="mt-4 bg-blue-500 text-white p-2 hover:bg-yellow-500 "
        >
          {t("storeProduct.buttonAddCard")}
        </button>
        {isAddingWhoWeAre && (
          <WhoWeAreForm onClose={handleCloseProductCreator} />
        )}
      </div>
    </>
  )
}

export default About
