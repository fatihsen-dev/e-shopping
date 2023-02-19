export const initialState: StoreState = {
  products: {
    products: [
      {
        id: 0,
        title: "",
        description: "",
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: "",
        category: "",
        thumbnail: "",
        images: [""],
      },
    ],
    total: 0,
    skip: 0,
    limit: 0,
  },
  favorites: localStorage.getItem("favorites")
    ? JSON.parse(`${localStorage.getItem("favorites")}`)
    : [
        {
          id: 0,
          title: "",
          description: "",
          price: 0,
          discountPercentage: 0,
          rating: 0,
          stock: 0,
          brand: "",
          category: "",
          thumbnail: "",
          images: [""],
        },
      ],
  cart: localStorage.getItem("cart")
    ? JSON.parse(`${localStorage.getItem("cart")}`)
    : [
        {
          id: 0,
          title: "",
          description: "",
          price: 0,
          discountPercentage: 0,
          rating: 0,
          stock: 0,
          brand: "",
          category: "",
          thumbnail: "",
          images: [""],
          count: 0,
        },
      ],
}
