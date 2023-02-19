import { initialState } from "./initialState"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../index"

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    loadAllProducts: (state, action: PayloadAction<Products>) => {
      state.products = action.payload.products
    },
    loadAllFavorites: (state, action: PayloadAction<Favorites>) => {
      state.favorites = action.payload.favorites
      localStorage.setItem("favorites", JSON.stringify(state.favorites))
    },
    loadAllCart: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload.cart
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
  },
})

export const { loadAllProducts, loadAllFavorites, loadAllCart } = shopSlice.actions
export const shopSelector = (state: RootState) => state.shop
export default shopSlice.reducer
