import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectRole } from "../../features/auth/userSlice"
import ProfileCard from "./ProfileCard"
import styles from "./styles/Home.module.css"
import { useTranslation } from "react-i18next"
import { getProfile, selectProfile } from "./profileSlice"
import logo from "../../assets/logo.png"

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
            id="addCard"
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
      <div className="container mx-auto px-4">
      <ul className="space-y-6">
    {profile?.map((profileItem, index) => (
        <li
        key={profileItem?.id}
        className={` shadow-md rounded-lg ${
            index === 0 ? "bg-black text-white" : "bg-white text-black"
        } flex items-stretch space-x-4`}
    >
          {index === 1 && (
                <div className="flex flex-col bg-black">
                  
                    <img src={logo} alt="Logo" className="w-46 h-auto mt-72"/>
                </div>
            )}
            {index % 2 === 0 ? (
                <>
                    {profileItem?.url && (
                        <img
                            src={profileItem?.url}
                            alt={profileItem?.name}
                            className={`w-36 h-auto sm:w-36 md:w-56 lg:w-56 xl:w-64 rounded ml-4 ${index === 0 ? '-mt-6' : ''}`}
                        />
                    )}
                    <div className="flex-grow">
                        <p>{profileItem?.description}</p>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex-grow">
                        <p>{profileItem?.description}</p>
                    </div>
                    {profileItem?.url && (
                        <img
                            src={profileItem?.url}
                            alt={profileItem?.name}
                            className={`w-36 h-auto sm:w-36 md:w-56 lg:w-56 xl:w-64 rounded ml-4 ${index === 0 ? '-mr-6 -mt-6' : ''}`}
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
