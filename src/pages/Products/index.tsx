import React from "react"
import styles from "./Produncts.module.scss"
import Banner from "../../components/Banner/Banner"
import BestSelling from "../../components/BestSelling/BestSelling"
import HelmetMeta from "../../components/Meta/HelmetMeta"
import { useTranslation } from "react-i18next"
import ProductContent from "../../components/ProductContent/ProductContent"

export default function Products() {
  const { t } = useTranslation()
  return (
    <>
      <HelmetMeta title={`${t("home")} - E-Shopping`} />
      <div className={styles.products}>
        <div className={styles.container}>
          <Banner />
          <BestSelling />
          <ProductContent />
        </div>
      </div>
    </>
  )
}
