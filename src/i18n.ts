import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import enJson from "./languages/en.json"
import trJson from "./languages/tr.json"

const resources = {
  en: {
    translation: enJson,
  },
  tr: {
    translation: trJson,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "en",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
