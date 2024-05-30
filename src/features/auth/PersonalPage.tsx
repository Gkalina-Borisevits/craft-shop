import type { FC } from "react"
import type React from "react"
import { useEffect, useState } from "react"
import styles from "./styles/PersonalPage.module.css"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout, selectRole, selectUser, updateUser } from "./userSlice"
import type { User } from "./types/User"
import { toast } from "react-toastify"
import logo from "../../assets/logo.png"
import UserRoleForm from "../../components/form/UserRoleForm"
import { useNavigate } from "react-router-dom"

const PersonalPage: FC = () => {
  const today = new Date().toISOString().split("T")[0]
  const { t } = useTranslation("translation")
  const user = useAppSelector(selectUser)
  const role = useAppSelector(selectRole)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const viewUserRoleForm = role === "ADMINISTRATOR" || role === "MODERATOR"

  const [formData, setFormData] = useState<User>({
    id: 0,
    firstName: "",
    lastName: "",
    phone: "",
    role: "",
    birthdate: "1990-01-01",
    addressDto: {
      street: "",
      building: "",
      numberApartment: "",
      indexNum: "",
      country: "",
      city: "",
    },
  })

  useEffect(() => {
    if (user) {
      setFormData(user)
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name.includes("addressDto.")) {
      const fieldPath = name.split(".")
      const field = fieldPath[1]
      setFormData(prevData => ({
        ...prevData,
        addressDto: {
          ...prevData.addressDto,
          [field]: value,
        },
      }))
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Personal Page: ", formData)
    await dispatch(updateUser(formData))
      .unwrap()
      .then(() => {
        toast.info(t("toasty.contactUpdated"))
      })
      .catch(() => {
        toast.error(t("toasty.noUpdatedContact"))
      })
  }

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        toast.success(t("toasty.personalDataDeleted"))
        navigate("/")
      })
      .catch(() => {
        toast.error(t("toasty.personalDataNoDeleted"))
      })
  }

  return (
    <>
      <div className={styles.personalPageContainer}>
        {viewUserRoleForm && <UserRoleForm />}
        <div className="container mx-auto px-4 flex items-center justify-start mb-3 ">
          <button
            id="logout"
            className="text-xl mb-4 text-white p-2 hover:bg-red-400 border rounded mt-3"
            onClick={handleLogout}
          >
            {t("personalPage.logOut")}
          </button>
        </div>

        <div className="container mx-auto px-4">
          <div className="text-right">
            <div className={styles.headerUpdateAccount}></div>
          </div>
          <div className="mt-9 mb-6">
            <h3 className="text-xl font-bold mb-4 text-white">
              {t("personalPage.personalData")}
            </h3>
            <p className="text-xl mb-3 text-white">
              {t("personalPage.updatePersonalData")}
            </p>
            <p className="text-xl mb-3 text-white">
              {t("personalPage.emailHeader")} {user?.email} {user?.role}
              {t("personalPage.emailFooter")}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            id="updateForm"
            className="flex justify-between"
          >
            <div className="space-y-4 w-1/2 pr-2 mt-6">
              <input
                type="text"
                name="firstName"
                placeholder={t("personalPage.name")}
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded "
              />
              <input
                type="text"
                name="phone"
                placeholder={t("personalPage.phone")}
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded mt-10"
              />
              <div className={styles.addressForm}></div>
              <input
                type="text"
                name="addressDto.street"
                placeholder={t("personalPage.street")}
                value={formData?.addressDto?.street}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />

              <input
                type="text"
                name="addressDto.building"
                placeholder={t("personalPage.building")}
                value={formData?.addressDto?.building}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="number"
                name="addressDto.numberApartment"
                placeholder={t("personalPage.numberApartment")}
                value={formData.addressDto?.numberApartment}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="space-y-4 w-1/2 pl-2 mt-6">
              <input
                type="text"
                name="lastName"
                placeholder={t("personalPage.lastName")}
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="date"
                name="birthdate"
                placeholder={t("personalPage.dataOfBirth")}
                value={formData.birthdate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                max={today}
              />
              <div className={styles.addressForm}></div>

              <input
                type="text"
                name="addressDto.indexNum"
                placeholder={t("personalPage.code")}
                value={formData?.addressDto?.indexNum}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />

              <input
                type="text"
                name="addressDto.city"
                placeholder={t("personalPage.city")}
                value={formData?.addressDto?.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="text"
                name="addressDto.country"
                placeholder={t("personalPage.country")}
                value={formData?.addressDto?.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </form>

          <button
            id="update-button"
            type="submit"
            form="updateForm"
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-yellow-400 mt-9"
          >
            {t("personalPage.update")}
          </button>
        </div>
      </div>
      <div className={styles.logoPersonalPage}>
        <img src={logo} alt="Logo" className="max-w-full" />
      </div>
    </>
  )
}

export default PersonalPage
