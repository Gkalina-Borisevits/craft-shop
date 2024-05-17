import type { FC } from "react"
import { useEffect, useRef, useState } from "react"
import styles from "./BurgerMenu.module.css"
import { NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"

const BurgerMenu: FC = () => {
  const { t } = useTranslation("translation")
  const [isOpen, setIsOpen] = useState(false)
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const [isContactsSubMenuOpen, setIsContactsSubMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const subMenuRef = useRef<HTMLDivElement>(null)
  const contactsSubMenuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleMainItemClick = () => {
    setIsSubMenuOpen(!isSubMenuOpen)
  }

  const handleContactsItemClick = () => {
    setIsContactsSubMenuOpen(!isContactsSubMenuOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
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

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={styles.burgerMenu}>
      <div className={styles.icon} onClick={toggleMenu}>
        ☰
      </div>
      {isOpen && (
        <div className={styles.menu} ref={menuRef}>
          <div className={styles.navbar}>
            <NavLink to="/" onClick={() => setIsOpen(false)}>
              {t("header.home")}
            </NavLink>
            <NavLink to="/products" onClick={() => setIsOpen(false)}>
              {t("header.products")}
            </NavLink>
            <NavLink to="/services" onClick={() => setIsOpen(false)}>
              {t("header.services")}
            </NavLink>
            <div className="relative" ref={contactsSubMenuRef}>
              <button
                onClick={handleContactsItemClick}
                className="block p-2 r text-black"
              >
                {t("header.contacts")}
              </button>
              {isContactsSubMenuOpen && (
                <div className="absolute left-full ml-0 mt-2 min-w-max max-w-sm bg-white shadow-md rounded-md z-10 p-1 text-black">
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
              <button onClick={handleMainItemClick} className="block p-2 text-black">
                {t("header.about")}
              </button>
              {isSubMenuOpen && (
                <div className="absolute left-full ml-0 mt-2 min-w-max max-w-sm bg-white shadow-md rounded-md z-10 p-1 text-black">
                  <NavLink to="/about/who-we-are" className="block p-2 text-black hover:bg-blue-400" onClick={() => setIsSubMenuOpen(false)}>
                    <p>{t("header.whoWeAre")}</p>
                  </NavLink>
                  <NavLink to="/about/careers" className="block p-2 text-black hover:bg-blue-400" onClick={() => setIsSubMenuOpen(false)}>
                    <p>{t("header.careers")}</p>
                  </NavLink>
                  <NavLink to="/about/our-projects" className="block p-2 text-black hover:bg-blue-400" onClick={() => setIsSubMenuOpen(false)}>
                    <p>{t("header.ourProject")}</p>
                  </NavLink>
                </div>
              )}
            </div>
            <NavLink to="/registration" onClick={() => setIsOpen(false)}>
              {t("header.registration")}
            </NavLink>
            <NavLink to="/login" onClick={() => setIsOpen(false)}>
              {t("header.login")}
            </NavLink>
          </div>
        </div>
      )}
    </div>
  )
}

export default BurgerMenu
