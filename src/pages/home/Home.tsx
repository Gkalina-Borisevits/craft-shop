import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectRole } from "../../features/auth/userSlice"
import ProfileCard from "./ProfileCard"
import styles from "./styles/Home.module.css"
import { useTranslation } from "react-i18next"
import { getProfile, selectProfile } from "./profileSlice"

const Home = () => {
  const { t } = useTranslation("translation")
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const role = useAppSelector(selectRole)
  const profile = useAppSelector(selectProfile)
  const dispatch = useAppDispatch()

  const viewProductsForm = role === "ADMINISTRATOR" || role === "MODERATOR"

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  const handleAddProductClick = () => {
    setIsAddingProduct(true)
  }

  const handleCloseProductCreator = () => {
    setIsAddingProduct(false)
  }
  return (
    <div className="container mx-auto px-4 mt-9">
      {viewProductsForm && (
        <div className={styles.buttonAddNewImage}>
          <button
            id="add-card"
            onClick={handleAddProductClick}
            className="mt-2 mb-4 bg-blue-400 text-white p-2 hover:bg-yellow-400 rounded-md"
          >
            {t("storeProduct.editPage")}
          </button>
          {isAddingProduct && (
            <ProfileCard onClose={handleCloseProductCreator} />
          )}
        </div>
      )}
      <div className="container mx-auto px-4 bg-black text-white">
        <ul className="space-y-6">
          {profile?.map((profileItem, index) => (
            <li
              key={profileItem?.id}
              className="shadow-md rounded-lg bg-black text-white flex flex-col md:flex-row items-center md:items-stretch space-x-0 md:space-x-4 border-b border-white p-9 gap-5"
            >
              {index % 2 === 0 ? (
                <>
                  {profileItem?.url && (
                    <img
                      src={profileItem?.url}
                      alt={profileItem?.name}
                      className={`w-full sm:w-48 md:w-56 lg:w-56 xl:w-64 h-auto object-cover rounded md:ml-4 mx-auto`}
                    />
                  )}
                  <div className="flex-grow mt-4 md:mt-0 text-center md:text-left flex items-center">
                    <p>{profileItem?.description}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-grow mt-4 md:mt-0 text-center md:text-left flex items-center">
                    <p>{profileItem?.description}</p>
                  </div>
                  {profileItem?.url && (
                    <img
                      src={profileItem?.url}
                      alt={profileItem?.name}
                      className={`w-full sm:w-48 md:w-56 lg:w-56 xl:w-64 h-auto object-cover rounded md:ml-4 mx-auto`}
                    />
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home
