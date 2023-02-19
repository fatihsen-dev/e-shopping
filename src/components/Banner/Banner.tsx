import React from "react"
import styles from "./Banner.module.scss"
import bannerImg from "../../assets/images/banner.png"
import { useTranslation } from "react-i18next"

export default function Banner() {
  const { t } = useTranslation()

  return (
    <div className={styles.banner}>
      <div className={styles.bannerText}>
        <div>
          <h2>{t("bannerTitle")}</h2>
          <p>{t("bannerSubTittle")}</p>
        </div>
      </div>
      <div className={styles.image}>
        <img src={bannerImg} alt="" />
      </div>
    </div>
  )
}
