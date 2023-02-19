import React, { useEffect, useState } from "react"
import styles from "./ProductContent.module.scss"
import { useTranslation } from "react-i18next"
import { Listbox } from "@headlessui/react"
import { useAppSelector } from "../../stores/hook"
import Card from "../Card/Card"

export default function ProductContent() {
  const [sortedProducts, setSortedProducts] = useState<Product[]>()
  const { products } = useAppSelector((state) => state.shop)
  const { t } = useTranslation()

  const categorys = [
    { id: 1, text: t("productsMenu.recommended") },
    { id: 2, text: t("productsMenu.lowestPrice") },
    { id: 3, text: t("productsMenu.highestPrice") },
    { id: 4, text: t("productsMenu.popular") },
  ]
  const [selectedCategory, setSelectedCategory] = useState(categorys[0])

  useEffect(() => {
    if (selectedCategory.id === 1) {
      setSortedProducts(products.products)
    } else if (selectedCategory.id === 2) {
      // yükselen fiyata göre listeleme

      const sortedProducts = [...products.products]
      sortedProducts.sort((a: Product, b: Product) => a.price - b.price)
      setSortedProducts(sortedProducts)
    } else if (selectedCategory.id === 3) {
      // azalan fiyata göre listeleme

      const sortedProducts = [...products.products]
      sortedProducts.sort((a: Product, b: Product) => a.price - b.price).reverse()
      setSortedProducts(sortedProducts)
    } else if (selectedCategory.id === 4) {
      // Popülerliğe göre sıralama

      const sortedProducts = [...products.products]
      sortedProducts.sort((a: Product, b: Product) => a.rating - b.rating).reverse()
      setSortedProducts(sortedProducts)
    }
  }, [selectedCategory])

  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = products.products.filter((product: Product) => {
      if (product.title.toLowerCase().includes(e.target.value)) {
        return product.title.toLowerCase().includes(e.target.value)
      } else if (product.description.toLowerCase().includes(e.target.value)) {
        return product.description.toLowerCase().includes(e.target.value)
      }
    })
    setSortedProducts(filtered)
  }

  return (
    <div className={`${styles.products} products-area`}>
      <div className={styles.titleAndInput}>
        <span className={`font-medium`}>{t("allProducts")}</span>
        <div className={styles.inputAndSelect}>
          <input onInput={inputHandle} placeholder={`${t("productFilterPlaceholder")}`} type="text" />
          <div className={`${styles.selector} selector`}>
            <Listbox value={selectedCategory} onChange={setSelectedCategory}>
              <Listbox.Button>{selectedCategory.text}</Listbox.Button>
              <Listbox.Options>
                {categorys.map((category) => (
                  <Listbox.Option key={category.id} value={category}>
                    {category.text}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
        </div>
      </div>
      <div className={styles.cards}>
        {sortedProducts &&
          sortedProducts.map((p, index) => (
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
    </div>
  )
}
