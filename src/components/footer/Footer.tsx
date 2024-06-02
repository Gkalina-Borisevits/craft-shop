import type { FC } from "react"
import styles from "./Footer.module.css"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router-dom"
import logoFooter from "../../assets/logoFooter.png";
import EmailForm from "../form/EmailForm";

const Footer: FC = () => {
  const { t } = useTranslation("translation")
  return (
    <div className={styles.bigContainer}>
      <div className={styles.emailFormContainer}>
        <EmailForm />
      </div>
      <div className={styles.footer}>
        <div className={styles.socialLinks}>
          <h3>{t("footer.findUsOn")}</h3>
          <p>
            <a target="_blank" href="https://www.twitter.com" rel="noreferrer">
              Twitter (X)
            </a>
            <a target="_blank" href="https://www.instagram.com" rel="noreferrer">
              Instagram
            </a>
            <a
              target="_blank"
              href="https://www.pinterest.com "
              rel="noreferrer"
            >
              Pinterest
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com "
              rel="noreferrer"
            >
              Facebook
            </a>
            <a
              target="_blank"
              href="https://www.tiktok.com "
              rel="noreferrer"
            >
              Tik Tok
            </a>
          </p>
        </div>

        <div className={styles.footerMayHelpYou}>
          <h3>{t("footer.mayHelpYou")}</h3>
          <nav>
            <NavLink to="/contacts/asked-questions">FAQ`s</NavLink>
            <NavLink to="/contacts/contact-us">{t("footer.contactUs")}</NavLink>
            <NavLink to="/payment-info">{t("footer.paymentOptions")}</NavLink>
            <NavLink to="/shipping-services">
              {t("footer.shippingServices")}
            </NavLink>
          </nav>
        </div>
        <div className={styles.footerAboutCompany}>
          <h3>{t("footer.aboutCompany")}</h3>
          <nav>
            <NavLink to="/about/who-we-are">{t("footer.aboutHarmanCoal")}</NavLink>
            <NavLink to="/about/careers">{t("footer.careers")}</NavLink>
            <NavLink to="/contacts/support">{t("footer.contacts")}</NavLink>
          </nav>
        </div>
        <div className={styles.logoFooter}>
          <img src={logoFooter} alt="logo" />
        </div>
      </div>
    </div>
  )
}

export default Footer
