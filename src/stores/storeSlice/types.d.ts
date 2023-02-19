type Product = {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: [string]
}

type Favorites = {
  favorites: Product[]
}

type cartExtendedType = Product & { count: number }

type Cart = {
  cart: cartExtendedType[]
}

type Products = {
  products: {
    products: Product[]
    total: number
    skip: number
    limit: number
  }
}

type StoreState = Favorites & Products & Cart
