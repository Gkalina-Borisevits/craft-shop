import type { FC, FormEvent } from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import styles from "./styles/EmailForm.module.css"
import { FaArrowRight } from "react-icons/fa"

const EmailForm: FC = () => {
  const { t } = useTranslation("translation")
  const [email, setEmail] = useState<string>("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    alert(`${t("footer.subscribing")}: ${email}`)
    setEmail("")
  }

  return (
    <div className={`${styles.emailFormContainer} hidden md:block`}>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto  relative"
      >
        <h3 className="text-lg font-semibold text-center mb-6">
          {t("footer.signUpUpdates")}
        </h3>
        <span className="text text-center mb-6">
          {t("footer.emailFormText")}
        </span>
        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder={t("footer.emailAddress")}
            required
            className="px-4 py-3 border border-black rounded w-full pl-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button
            id="sendEmail"
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-black font-bold py-1 px-2 rounded-tr rounded-br flex items-center justify-center"
            style={{ outline: "none", width: "40px", height: "40px" }}
          >
            <FaArrowRight
              className="w-4 h-4"
              color="black"
              style={{ transform: "rotate(-45deg)" }}
            />
          </button>
        </div>
      </form>
    </div>
  )
}

export default EmailForm
