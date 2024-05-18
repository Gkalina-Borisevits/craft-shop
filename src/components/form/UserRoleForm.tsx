import type React from "react"
import type { UserRoleData } from "./types/UserRoleData"
import { useAppDispatch } from "../../app/hooks"
import { updateUser } from "./api"
import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"

const UserRoleForm: React.FC = () => {
  const { t } = useTranslation("translation")
  const [formData, setFormData] = useState<UserRoleData>({
    email: "",
    role: "",
  })
  const [errors, setErrors] = useState<{ email?: string; role?: string }>({})
  const dispatch = useAppDispatch()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validate = () => {
    let errors = {}
    if (!formData.email) {
      errors = { ...errors, email: t("selectRole.emailRequired") }
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors = { ...errors, email: t("selectRole.invalidEmail") }
    }
    if (!formData.role) {
      errors = { ...errors, role: t("selectRole.roleRequired") }
    }
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmitCallback = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (validate()) {
        try {
          await dispatch(updateUser(formData))
          setFormData({ email: "", role: "" })
        } catch (error) {
          console.error("Failed user:", error)
        }
      }
    },
    [dispatch, formData, validate],
  )

  return (
    <div className="flex items-center justify-center mb-8">
      <form
        onSubmit={handleSubmitCallback}
        className="space-y-4 w-1/2 pr-2 mt-6"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            {t("contacts.email")}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.email && (
            <div className="text-red-500 text-xs italic">{errors.email}</div>
          )}
        </div>
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-300"
          >
            {t("selectRole.changeRole")}
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">{t("selectRole.roleChoose")}</option>
            <option value="admin">{t("selectRole.administrator")}</option>
            <option value="user">{t("selectRole.user")}</option>
          </select>
          {errors.role && (
            <div className="text-red-500 text-xs italic">{errors.role}</div>
          )}
        </div>
        <button
          id="send-role"
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md  text-sm font-medium text-white bg-indigo-600  hover:bg-yellow-400 "
        >
          {t("selectRole.changeRole")}
        </button>
      </form>
    </div>
  )
}

export default UserRoleForm
