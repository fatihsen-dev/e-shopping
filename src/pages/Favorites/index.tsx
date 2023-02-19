import React from "react"
import styles from "./Favorites.module.scss"
import HelmetMeta from "../../components/Meta/HelmetMeta"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../stores/hook"
import Card from "../../components/Card/Card"

export default function Favorites() {
  const { favorites } = useAppSelector((state) => state.shop)
  const { t } = useTranslation()

  return (
    <>
      <HelmetMeta title={`${t("favorites")} - E-Shopping`} />
      <div className={`${styles.favorites}`}>
        <div className={`${styles.container}`}>
          {favorites[0]?.title?.length > 0 ? (
            <>
              <span className={`font-medium`}>{t("favorites")}</span>
              <div className={styles.cards}>
                {favorites.map((p, index) => (
                  <Card
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
            </>
          ) : (
            <div className={styles.emptyFav}>{t("emptyFav")}</div>
          )}
        </div>
      </div>
    </>
  )
}
