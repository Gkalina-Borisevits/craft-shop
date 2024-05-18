import type { FC } from "react"
import type React from "react"
import { useEffect, useState } from "react"
import styles from "./styles/PersonalPage.module.css"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { deleteUser, selectRole, selectUser, updateUser } from "./userSlice"
import type { User } from "./types/PersonalPageData"
import { toast } from "react-toastify"
import logo from "../../assets/logo.png"
import UserRoleForm from "../../components/form/UserRoleForm"

const PersonalPage: FC = () => {
  const today = new Date().toISOString().split("T")[0]
  const { t } = useTranslation("translation")
  const user = useAppSelector(selectUser)
  const role = useAppSelector(selectRole)
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState<User>({
    id: 0,
    firstName: "",
    lastName: "",
    phone: "",
    birthdate: "1990-01-01",
    street: "",
    city: "",
    country: "",
    postalCode: "",
    role: "",
  })

  useEffect(() => {
    if (user) {
      setFormData(user)
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
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

  const handleDeleteUser = () => {
    dispatch(deleteUser())
      .unwrap()
      .then(() => {
        toast.success(t("toasty.personalDataDeleted"))
      })
      .catch(() => {
        toast.error(t("toasty.personalDataNoDeleted"))
      })
  }

  const viewUserRoleForm = role === "ADMINISTRATOR" || role === "MODERATOR"

  return (
    <div className={styles.personalPageContainer}>
      {viewUserRoleForm && <UserRoleForm />}

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
            {t("personalPage.emailHeader")} $`{formData.phone}{" "}
            {t("personalPage.emailFooter")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex justify-between">
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
              name="street"
              placeholder={t("personalPage.street")}
              value={formData.street}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="postalCode"
              placeholder={t("personalPage.code")}
              value={formData.postalCode}
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
              name="city"
              placeholder={t("personalPage.city")}
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="country"
              placeholder={t("personalPage.country")}
              value={formData.country}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </form>

        <div className="mt-4 text-right">
          <button
            id="resetPersonalPageButton"
            type="button"
            onClick={handleDeleteUser}
            className="px-6 py-2 rounded mr-2 bg-blue-400 hover:bg-yellow-400"
          >
            {t("personalPage.reset")}
          </button>
          <button
            id="updatePersonalPageButton"
            type="submit"
            form="updateForm"
            className="px-4 py-2 rounded bg-blue-500 text-white bg-yellow-400 hover:bg-blue-400"
          >
            {t("personalPage.update")}
          </button>
        </div>
      </div>
      <div className={styles.logoPersonalPage}>
        <img src={logo} alt="Logo" className="max-w-full" />
      </div>
    </div>
  )
}

export default PersonalPage
