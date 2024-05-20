import type { FC } from "react"
import type React from "react"
import { useState } from "react"
import styles from "./styles/Login.module.css"
import { useTranslation } from "react-i18next"
import { login } from "./userSlice"
import { useAppDispatch } from "../../app/hooks"
import { toast } from "react-toastify"
import type { User } from "./types/User"

const Login: FC = () => {
  const { t } = useTranslation("translation")
  const [formData, setFormData] = useState<User>({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Login:", formData)
    dispatch(login(formData))
      .unwrap()
      .then(() => {
        toast.info(t("toasty.login"))
      })
      .catch(() => {
        toast.error(t("toasty.noUpdatedContact"))
      })
  }

  return (
    <div className={styles.loginFormContainer}>
      <div className="flex items-center justify-center bg-black px-4">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl text-white font-extrabold text-gray-900">
              {t("registration.signToAccount")}
            </h2>
          </div>
          <form className="mt-8 space-y-6 bg-black" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder={t("contacts.email")}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder={t("registration.password")}
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="mt-2 flex items-center text-white">
                  <input
                    type="checkbox"
                    id="togglePassword"
                    className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-transparent focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    onChange={handleTogglePassword}
                    checked={showPassword}
                  />
                  <label
                    htmlFor="togglePassword"
                    className="text-sm text-white select-none"
                  >
                    {t("registration.showPassword")}
                  </label>
                </div>
              </div>
            </div>
            <div>
              <button
                id="login"
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-blue-400 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-7"
              >
                {t("registration.signIn")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
