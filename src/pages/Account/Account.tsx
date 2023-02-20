import React, { useState } from "react"
import styles from "./Account.module.scss"
import HelmetMeta from "../../components/Meta/HelmetMeta"
import { useTranslation } from "react-i18next"
import AddressModal from "../../components/AddressModal/AddressModal"

export default function Account() {
  const [modalIsActive, setModalIsActive] = useState<boolean>(false)
  const { t } = useTranslation()

  return (
    <>
      <HelmetMeta title={`${t("account")} - E-Shopping`} />
      <div className={styles.account}>
        <div className={styles.container}>
          <div className={styles.title}>
            <span>{t("addressTitle")}</span>
            <button onClick={() => setModalIsActive(true)}>{t("addressAddBtn")}</button>
          </div>
          <div className={styles.address}></div>
        </div>
      </div>
      <AddressModal setModalIsActive={setModalIsActive} modalIsActive={modalIsActive} />
    </>
  )
}
