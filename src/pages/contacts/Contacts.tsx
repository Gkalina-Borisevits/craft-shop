import type { FC } from "react"
import type React from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa"
import styles from "./Contacts.module.css"
import { useAppDispatch } from "../../app/hooks"
import { toast } from "react-toastify"
import logo from "../../assets/logo.png"
import { sendContacts } from "./contactsSlice"

const Contacts: FC = () => {
  const { t } = useTranslation("translation")
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    question: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (
        !formData.name ||
        !formData.lastName ||
        !formData.email ||
        !formData.question
      ) {
        alert(t("contacts.fillAllFields"))
        return
      }
      console.log(formData)
      console.log("Contacts: ", formData)
      dispatch(sendContacts(formData))
        .unwrap()
        .then(() => {
          toast.success(t("contacts.thankQuestion"))
          setFormData({
            name: "",
            lastName: "",
            email: "",
            question: "",
          })
        })
        .catch(() => {
          toast.error(t("toasty.noUpdatedContact"))
        })
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className={styles.bigContactsContainer}>
      <div className={styles.contactsContainer}>
        <div className={styles.formContainer}>
          <div className={styles.textContainer}>
            <h1 className="text-lg font-semibold text-center mb-4 text-white">
              {t("contacts.feedbackForm")}
            </h1>
          </div>
          <div className={styles.inputFormContainer}>
            <div className="max-w-md mx-auto my-10 p-4 bg-black">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-3 text-white">
                  <p>
                    {t("contacts.name")} {"*"}
                  </p>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border border-black rounded w-full pl-2"
                  />
                  <p>
                    {t("contacts.surname")} {"*"}
                  </p>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border border-black rounded w-full pl-2"
                  />
                  <p>
                    {t("contacts.email")} {"*"}
                  </p>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border border-black rounded w-full pl-2"
                  />
                  <p>
                    {t("contacts.yourQuestion")} {"*"}
                  </p>
                  <textarea
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border border-black rounded w-full pl-2"
                  />
                  <button
                    type="submit"
                    className="bg-blue-400 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded"
                  >
                    {t("contacts.send")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.socialLinkContainer}>
        <h2>{t("contacts.ourSocialMedia")}</h2>

        <a target="_blank" href="https://www.twitter.com" rel="noreferrer">
          <FaTwitter />
        </a>
        <a target="_blank" href="https://www.instagram.com" rel="noreferrer">
          <FaInstagram />
        </a>
        <a
          target="_blank"
          href="https://www.pinterest.com "
          rel="noreferrer"
        >
          <FaPinterest />
        </a>
        <a
          target="_blank"
          href="https://www.facebook.com "
          rel="noreferrer"
        >
          <FaFacebook />
        </a>
        <a
          target="_blank"
          href="https://www.tiktok.com"
          rel="noreferrer"
        >
          <FaTiktok />
        </a>
      </div>{" "}
      <div className={styles.logoRegistration}>
        <img src={logo} alt="Logo" className="max-w-full" />
      </div>
    </div>
  )
}

export default Contacts
