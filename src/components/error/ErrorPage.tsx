import type { FC } from "react"
import error from "../../assets/error.webp"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

const ErrorPage: FC = () => {
  const { t } = useTranslation("translation")
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="text-center">
        <img src={error} alt="lock" className="w-32 h-32 mb-9 mx-auto" />
        <h1 className="text-3xl font-bold text-red-600">
          {t("errorPage.accessDenied")}
        </h1>
        <p className="text-lg mt-4">{t("errorPage.notPermission")}</p>
        <Link
          to="/"
          className="inline-block bg-blue-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mt-9"
        >
          {" "}
          {t("header.home")}
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage
