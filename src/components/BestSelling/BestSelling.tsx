import React, { useState, useEffect } from "react"
import styles from "./BestSelling.module.scss"
import { useTranslation } from "react-i18next"
import Card from "../Card/Card"
import { useAppSelector } from "../../stores/hook"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Navigation, Pagination } from "swiper"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"

export default function BestSelling() {
  const [mostPopular, setMostPopular] = useState<Product[]>()
  const { t } = useTranslation()
  const { products } = useAppSelector((state) => state.shop)

  useEffect(() => {
    if (products.products.length > 1) {
      setMostPopular(products.products.filter((p) => p.rating > 4.7))
    }
  }, [])

  return (
    <div className={styles.bestSelling}>
      <span className={`font-medium`}>{t("bestselling")}</span>
      <Swiper
        breakpoints={{
          700: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          800: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1120: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1350: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1600: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        modules={[FreeMode, Pagination, Navigation]}
        navigation={true}
        className={styles.cards}
      >
        {mostPopular &&
          mostPopular.map((p, index) => (
            <SwiperSlide key={index}>
              <Card
                id={p.id}
                className="best-card"
                rating={p.rating}
                img={p.thumbnail}
                title={`${p.title}`}
                price={p.price}
                subTitle={p.description}
                stock={p.stock}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}
