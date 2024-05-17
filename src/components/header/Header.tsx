import type { FC } from "react"
import { useEffect, useRef, useState } from "react"
import styles from "./Header.module.css"
import { NavLink } from "react-router-dom"
import logoHeader from "../../assets/logoHeader.png"
import { useTranslation } from "react-i18next"
import BurgerMenu from "../burgerMenu/BurgerMenu"
import { FaGlobe, FaUserAlt } from "react-icons/fa"

const Header: FC = () => {
  const { i18n, t } = useTranslation("translation")
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const languageMenuRef = useRef<HTMLDivElement>(null)
  const subMenuRef = useRef<HTMLDivElement>(null)
  const contactsSubMenuRef = useRef<HTMLDivElement>(null)
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const [isContactsSubMenuOpen, setIsContactsSubMenuOpen] = useState(false)

  const languages = [
    { code: "en", name: "EN", flag: "🇬🇧" },
    { code: "de", name: "DE", flag: "🇩🇪" },
    { code: "ru", name: "RU", flag: "🇷🇺" },
    { code: "ua", name: "UA", flag: "🇺🇦" },
  ]

  useEffect(() => {
    if (i18n.language) {
      localStorage.setItem("userLanguage", i18n.language)
    }
  }, [i18n.language])

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      languageMenuRef.current &&
      !languageMenuRef.current.contains(event.target as Node)
    ) {
      setIsLanguageDropdownOpen(false)
    }
    if (
      subMenuRef.current &&
      !subMenuRef.current.contains(event.target as Node)
    ) {
      setIsSubMenuOpen(false)
    }
    if (
      contactsSubMenuRef.current &&
      !contactsSubMenuRef.current.contains(event.target as Node)
    ) {
      setIsContactsSubMenuOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleMainItemClick = () => {
    setIsSubMenuOpen(!isSubMenuOpen)
  }

  const handleContactsItemClick = () => {
    setIsContactsSubMenuOpen(!isContactsSubMenuOpen)
  }

  return (
    <div className={styles.headerContainer}>
      <div className={styles.burgerMenuContainer}>
        <BurgerMenu />
      </div>

      <div className={styles.logoHeader}>
        <img src={logoHeader} alt="logo" />
      </div>

      <div className={styles.navbar}>
        <NavLink to="/" onClick={() => setIsLanguageDropdownOpen(false)}>
          {t("header.home")}
        </NavLink>
        <NavLink
          to="/products"
          onClick={() => setIsLanguageDropdownOpen(false)}
        >
          {t("header.products")}
        </NavLink>
        <NavLink
          to="/services"
          onClick={() => setIsLanguageDropdownOpen(false)}
        >
          {t("header.services")}
        </NavLink>
        <div className="relative" ref={contactsSubMenuRef}>
          <button
            onClick={handleContactsItemClick}
            className="block p-2 text-white"
          >
            {t("header.contacts")}
          </button>
          {isContactsSubMenuOpen && (
            <div className="absolute left-0 mt-2 w-58 bg-white shadow-md rounded-md z-10 p-1">
              <NavLink
                to="/contacts/support"
                className="block p-2 text-black hover:bg-blue-400"
                onClick={() => setIsContactsSubMenuOpen(false)}
              >
                <p>{t("header.contactInfo")}</p>
              </NavLink>
              <NavLink
                to="/contacts/asked-questions"
                className="block p-2 text-black hover:bg-blue-400"
                onClick={() => setIsContactsSubMenuOpen(false)}
              >
                <p>{t("header.faq")}</p>
              </NavLink>
              <NavLink
                to="/contacts/contact-us"
                className="block p-2 text-black hover:bg-blue-400"
                onClick={() => setIsContactsSubMenuOpen(false)}
              >
                <p>{t("header.contactUs")}</p>
              </NavLink>
            </div>
          )}
        </div>
        <div className="relative" ref={subMenuRef}>
          <button
            onClick={handleMainItemClick}
            className="block p-2 text-white"
          >
            {t("header.about")}
          </button>
          {isSubMenuOpen && (
            <div className="absolute left-0 mt-2 w-58  p-2 bg-white shadow-md rounded-md z-10 border border-gray-200">
              <NavLink
                to="/about/who-we-are"
                className="block p-2 text-black hover:bg-blue-400"
                onClick={() => setIsSubMenuOpen(false)}
              >
                <p>{t("header.whoWeAre")}</p>
              </NavLink>
              <NavLink
                to="/about/careers"
                className="block p-2 text-black hover:bg-blue-400"
                onClick={() => setIsSubMenuOpen(false)}
              >
                <p>{t("header.careers")}</p>
              </NavLink>
              <NavLink
                to="/about/our-projects"
                className="block p-2 text-black hover:bg-blue-400"
                onClick={() => setIsSubMenuOpen(false)}
              >
                <p>{t("header.ourProject")}</p>
              </NavLink>
            </div>
          )}
        </div>
        <NavLink
          to="/registration"
          onClick={() => setIsLanguageDropdownOpen(false)}
        >
          {t("header.registration")}
        </NavLink>

        <NavLink to="/login" onClick={() => setIsLanguageDropdownOpen(false)}>
          {t("header.login")}
        </NavLink>
      </div>

      <div>
        <NavLink to="/personal-page" className={styles.personalPageHeader}>
          {" "}
          <FaUserAlt />
        </NavLink>
      </div>

      <div
        className={styles.languageIcon}
        onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
      >
        <FaGlobe />
      </div>
      {isLanguageDropdownOpen && (
        <div ref={languageMenuRef} className={styles.languageDropdown}>
          {languages.map(language => (
            <div
              key={language.code}
              className={styles.languageOption}
              onClick={() => {
                changeLanguage(language.code)
                setIsLanguageDropdownOpen(false)
              }}
            >
              {language.flag} {language.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Header
