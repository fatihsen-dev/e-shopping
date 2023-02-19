import React, { useState, useEffect } from "react"
import styles from "./Cart.module.scss"
import HelmetMeta from "../../components/Meta/HelmetMeta"
import { useTranslation } from "react-i18next"
import Card from "../../components/Card/Card"
import { useAppSelector } from "../../stores/hook"
import { useNavigate } from "react-router-dom"

export default function Cart() {
  const [totalPrice, setTotalPrice] = useState<number>()
  const { cart } = useAppSelector((state) => state.shop)
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    setTotalPrice(cart.reduce((total: number, curent: Product & { count: number }) => total + curent.price * curent.count, 0))
  }, [cart])

  return (
    <>
      <HelmetMeta title={`${t("cart")} - E-Shopping`} />
      <div className={`${styles.cart}`}>
        <div className={`${styles.container}`}>
          {cart[0]?.title?.length > 0 ? (
            <>
              <div className={styles.cards}>
                {cart.map((p, index) => (
                  <Card
                    count={p.count}
                    id={p.id}
                    className="product-card"
                    rating={p.rating}
                    key={index}
                    img={p.thumbnail}
                    title={`${p.title}`}
                    price={p.price}
                    subTitle={p.description}
                    stock={p.stock}
                  />
                ))}
              </div>
              <div className={`${styles.price} product-card`}>
                <div className={styles.priceInner}>
                  <div className={styles.priceInnerTotalAndProduct}>
                    <div className={styles.totalInfo}>
                      <span>{t("cartPageTotalPrice")}</span>
                      <span>{totalPrice}$</span>
                    </div>
                    <div className={styles.productsInfos}>
                      {cart.map((c, index) => (
                        <div key={index}>
                          <div>
                            <span>x{c.count}</span>
                            <span>{c.title}</span>
                          </div>
                          <span>{c.price * c.count}$</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.buttonAndInput}>
                    <button onClick={() => navigate("/account")}>{t("cardBuyName")}</button>
                    <input placeholder={`${t("promotionCode")}`} type="text" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.emptyCart}>{t("emptyCart")}</div>
          )}
        </div>
      </div>
    </>
  )
}
