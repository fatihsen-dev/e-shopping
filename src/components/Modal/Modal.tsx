import React from "react"
import styles from "./Modal.module.scss"
import { IoMdClose } from "react-icons/io"

type PropsType = {
  text: string
  buttonOne: string
  buttonTwo: string
  modalIsActive: boolean
  setModalIsActive: any
  setRemoveOrFav: any
}

export default function Modal({ setRemoveOrFav, setModalIsActive, modalIsActive, text, buttonOne, buttonTwo }: PropsType) {
  return (
    <div className={`${styles.modal} ${modalIsActive ? "active-cart-modal" : ""}`}>
      <div className={styles.modalInner}>
        <button onClick={() => setModalIsActive(false)} className={styles.closeBtn}>
          <IoMdClose />
        </button>
        <span>{text}</span>
        <div className={styles.buttons}>
          <button onClick={() => setRemoveOrFav("remove")}>{buttonOne}</button>
          <button onClick={() => setRemoveOrFav("fav")}>{buttonTwo}</button>
        </div>
      </div>
    </div>
  )
}
