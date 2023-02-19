import siteSlice from "./siteSlice/siteSlice"
import { configureStore } from "@reduxjs/toolkit"
import shopSlice from "./storeSlice/shopSlice"

export const store = configureStore({
  reducer: {
    shop: shopSlice,
    site: siteSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
