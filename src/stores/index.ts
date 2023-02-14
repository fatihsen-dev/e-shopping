import { configureStore } from "@reduxjs/toolkit"
import storeSlice from "./storeSlice/storeSlice"

export const store = configureStore({
  reducer: {
    store: storeSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
