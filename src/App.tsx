import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export default function App() {
  const { t, i18n } = useTranslation()

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <button onClick={() => i18n.changeLanguage(i18n.language == "tr" ? "en" : "tr")}>Change</button>
    </div>
  )
}
