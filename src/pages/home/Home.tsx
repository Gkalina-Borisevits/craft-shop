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
    console.log("profile:", profile)
  }, [dispatch, profile])

  const handleAddProductClick = () => {
    setIsAddingProduct(true)
  }

  const handleCloseProductCreator = () => {
    setIsAddingProduct(false)
  }
  return (
    <div className="container mx-auto px-4">
    <div className="container mx-auto px-4">
  <h1 className="text-xl font-bold text-gray-800 mb-4">Profiles</h1>
  <ul className="space-y-4">
    {profile?.map((profileItem, index) => (
      <li key={profileItem?.id} className="p-4 shadow-md rounded-lg bg-white flex items-center">
        {index % 2 === 0 ? (
          <>
            {profileItem?.url && (
              <img src={profileItem?.url} alt={profileItem?.name} className="w-24 h-auto sm:w-24 md:w-40 lg:w-32 xl:w-48 rounded mr-4"/>
            )}
            <div className="flex-grow">
              <h2 className="text-lg font-semibold text-gray-700">Name: {profileItem?.name}</h2>
              <p className="text-gray-600">{profileItem?.description}</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex-grow">
              <h2 className="text-lg font-semibold text-gray-700">Name: {profileItem?.name}</h2>
              <p className="text-gray-600">{profileItem?.description}</p>
            </div>
            {profileItem?.url && (
              <img src={profileItem?.url} alt={profileItem?.name} className="w-24 h-auto sm:w-24 md:w-40 lg:w-32 xl:w-48 rounded ml-4"/>
            )}
          </>
        )}
      </li>
    ))}
  </ul>
</div>
      {viewProductsForm && (
        <div className={styles.buttonAddNewImage}>
          <button
            id="addCard"
            onClick={handleAddProductClick}
            className="mt-4 bg-blue-400 text-white p-2 hover:bg-yellow-400 "
          >
            {t("storeProduct.buttonAddCard")}
          </button>
          {isAddingProduct && (
            <ProfileCard onClose={handleCloseProductCreator} />
          )}
        </div>
      )}
    </div>
  )
}

export default Home
