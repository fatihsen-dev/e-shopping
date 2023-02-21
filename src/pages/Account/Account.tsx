import React, { useState } from "react"
import styles from "./Account.module.scss"
import HelmetMeta from "../../components/Meta/HelmetMeta"
import { useTranslation } from "react-i18next"
import AddressModal from "../../components/AddressModal/AddressModal"
import { useAppDispatch, useAppSelector } from "../../stores/hook"
import { FaTrash } from "react-icons/fa"
import { loadAddress } from "../../stores/siteSlice/siteSlice"

export default function Account() {
  const dispatch = useAppDispatch()
  const [modalIsActive, setModalIsActive] = useState<boolean>(false)
  const { address } = useAppSelector((state) => state.site)
  const { t } = useTranslation()

  const removeHandle = (id: string) => {
    dispatch(loadAddress([...address.filter((add) => add.id !== id)]))
  }

  return (
    <>
      <HelmetMeta title={`${t("account")} - E-Shopping`} />
      <div className={styles.account}>
        <div className={styles.container}>
          <div className={styles.title}>
            <span>{t("addressTitle")}</span>
            <button onClick={() => setModalIsActive(true)}>{t("addressAddBtn")}</button>
          </div>
          {address.length > 0 && (
            <div className={styles.address}>
              {address.map((add, index) => (
                <div key={index}>
                  <span>{`${add.name} ${add.surname}`}</span>
                  <span>{`${add.city} ${add.district}`}</span>
                  <span>{add.address}</span>
                  <div>
                    <span>{`+90 ${add.phone}`}</span>
                    <button onClick={() => removeHandle(add.id)}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <AddressModal setModalIsActive={setModalIsActive} modalIsActive={modalIsActive} />
    </>
  )
}
