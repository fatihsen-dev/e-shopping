import React from "react"
import styles from "./Error.module.scss"
import HelmetMeta from "../../components/Meta/HelmetMeta"
import { useTranslation } from "react-i18next"

export default function Error() {
  const { t } = useTranslation()

  return (
    <>
      <HelmetMeta title={`${t("error")} - E-Shopping`} />
      <div className={styles.error}>
        <div className={styles.container}>
          <h1>${t("errorTitle")}</h1>
          <p>${t("errorSubTitle")}</p>
        </div>
      </div>
    </>
  )
}
