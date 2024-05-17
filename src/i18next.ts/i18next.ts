import type { Resource } from "i18next"
import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import HttpBackend from "i18next-http-backend"
import translationDe from "../locales/de/translation.json"
import translationEn from "../locales/en/translation.json"
import translationRu from "../locales/ru/translation.json"
import translationUa from "../locales/ua/translation.json"

const resources: Resource = {
  de: { translation: translationDe },
  en: { translation: translationEn },
  ru: { translation: translationRu },
  ua: { translation: translationUa },
}

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpBackend)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    detection: {
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "./locales/{{lng}}/translation.json",
    },
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18next
