import React, { useEffect, useState } from "react"
import styles from "./Card.module.scss"
import { useTranslation } from "react-i18next"
import { RiHeartFill, RiHeartLine } from "react-icons/ri"
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import { IoMdClose } from "react-icons/io"
import { useAppDispatch, useAppSelector } from "../../stores/hook"
import { loadAllCart, loadAllFavorites } from "../../stores/storeSlice/shopSlice"
import { useLocation } from "react-router-dom"
import toast from "react-hot-toast"
import Modal from "../Modal/Modal"

type CardPropsType = {
  title: string
  subTitle: string
  img: string
  price: number
  stock: number
  rating: number
  className: string
  id: number
  count?: number
}

export default function Card({ count, id, className, rating, title, subTitle, img, price, stock }: CardPropsType) {
  const { favorites, products, cart } = useAppSelector((state) => state.shop)
  const [isFav, setIsFav] = useState<boolean>(false)
  const [modalIsActive, setModalIsActive] = useState<boolean>(false)
  const [removeOrFav, setRemoveOrFav] = useState<"remove" | "fav" | null>()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const { t } = useTranslation()

  useEffect(() => {
    favorites.forEach((fav) => fav.id === id && setIsFav(true))
  }, [favorites])

  const FavoritesToggle = () => {
    const product = products.products.find((p: Product) => p.id === id)
    const filtered = favorites.find((p: Product) => p.id === id)

    if (favorites[0]?.title?.length === 0 && product) {
      dispatch(loadAllFavorites({ favorites: [product] }))
      toast.success(t("addFavItemMessage"))
    } else if (!filtered && product) {
      dispatch(loadAllFavorites({ favorites: [...favorites, product] }))
      toast.success(t("addFavItemMessage"))
    } else if (filtered) {
      toast.success(t("removeFavItemMessage"))
      setIsFav(false)
      dispatch(loadAllFavorites({ favorites: favorites.filter((p: Product) => p.id !== id) }))
    }
  }

  const buyHandle = () => {
    const product = products.products.find((p: Product) => p.id === id)
    const findByCart = cart.find((p: Product) => p.id === id)
    const filtered = cart.filter((p: Product) => p.id !== id)

    if (findByCart && cart[0]?.title.length > 0) {
      dispatch(loadAllCart({ cart: [...filtered, { ...findByCart, count: findByCart.count + 1 }] }))
    } else if (product && cart[0]?.title.length === 0) {
      dispatch(loadAllCart({ cart: [{ ...product, count: 1 }] }))
    } else if (product && cart[0]?.title.length > 0) {
      dispatch(loadAllCart({ cart: [...filtered, { ...product, count: 1 }] }))
    } else if (product && cart.length === 0) {
      dispatch(loadAllCart({ cart: [{ ...product, count: 1 }] }))
    }
  }

  const decrementHandle = () => {
    const cloneCart = [...cart]
    const productId = cloneCart.findIndex((c) => c.id === id)

    if (productId !== -1) {
      const updatedProduct = {
        ...cloneCart[productId],
        count: cloneCart[productId].count !== 1 ? cloneCart[productId].count - 1 : cloneCart[productId].count,
      }

      dispatch(
        loadAllCart({
          cart: [...cloneCart.slice(0, productId), updatedProduct, ...cloneCart.slice(productId + 1)],
        })
      )
    }
  }

  const incrementHandle = () => {
    const cloneCart = [...cart]
    const productId = cloneCart.findIndex((c) => c.id === id)

    if (productId !== -1) {
      const updatedProduct = {
        ...cloneCart[productId],
        count:
          cloneCart[productId].count <= cloneCart[productId].stock - 1
            ? cloneCart[productId].count + 1
            : cloneCart[productId].count,
      }

      dispatch(
        loadAllCart({
          cart: [...cloneCart.slice(0, productId), updatedProduct, ...cloneCart.slice(productId + 1)],
        })
      )
    }
  }

  useEffect(() => {
    const product = products.products.find((p: Product) => p.id === id)
    const finBuFav = favorites.find((p: Product) => p.id === id)

    const filtered = cart.filter((p) => p.id !== id)

    if (removeOrFav === "remove") {
      dispatch(loadAllCart({ cart: [...filtered] }))
      setRemoveOrFav(null)
      setModalIsActive(false)
    } else if (removeOrFav === "fav") {
      if (favorites[0]?.title?.length === 0 && product) {
        dispatch(loadAllFavorites({ favorites: [product] }))
      } else if (!finBuFav && product) {
        dispatch(loadAllFavorites({ favorites: [...favorites, product] }))
      }

      dispatch(loadAllCart({ cart: [...filtered] }))
      setRemoveOrFav(null)
      setModalIsActive(false)
    }
  }, [removeOrFav])

  return (
    <>
      <div className={`${styles.card} ${className}`}>
        <div className={styles.img}>
          {location.pathname !== "/cart" ? (
            <span className={styles.rating}>{rating}</span>
          ) : (
            <button onClick={() => setModalIsActive(true)} className={styles.remove}>
              <IoMdClose />
            </button>
          )}
          <img src={img} alt="404" />
        </div>
        <div className={styles.titlePriceSubtitle}>
          <div className={styles.titlePrice}>
            <span className={styles.title}>{title}</span>
            <span className={styles.price}>{price}$</span>
          </div>
          <p className={styles.subTitle}>{subTitle}</p>
        </div>
        <div className={styles.stockAndButtons}>
          <span className={styles.stock}>
            {t("cardStock")}:{stock}
          </span>
          {location.pathname !== "/cart" ? (
            <div className={`card-buttons ${styles.buyAndFavButtons}`}>
              <button onClick={FavoritesToggle} className={styles.favBtn}>
                {location.pathname === "/favorites" || isFav ? (
                  <RiHeartFill />
                ) : (
                  <>
                    <RiHeartLine className={styles.lineHeart} />
                    <RiHeartFill className={styles.fillHeart} />
                  </>
                )}
              </button>
              <button onClick={buyHandle} className={styles.buyBtn}>
                {t("cardBuyName")}
              </button>
            </div>
          ) : (
            <div className={`${styles.countButtons}`}>
              <button onClick={decrementHandle}>
                <AiOutlineMinus />
              </button>
              <div className={`${styles.count}`}>{count}</div>
              <button onClick={incrementHandle}>
                <AiOutlinePlus />
              </button>
            </div>
          )}
        </div>
      </div>
      <Modal
        modalIsActive={modalIsActive}
        setModalIsActive={setModalIsActive}
        setRemoveOrFav={setRemoveOrFav}
        text="Ürünü sepetten kaldırmak istediğinize emin misiniz ?"
        buttonOne="Ürünü sepetten çıkar"
        buttonTwo="Ürünü sepetten çıkar ve favorilere ekle"
      />
    </>
  )
}
