import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../index"

const initialState: StoreState = {
  value: 0,
}

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state
    },
  },
})

export const { incrementByAmount } = storeSlice.actions
export const selectCount = (state: RootState) => state.store.value
export default storeSlice.reducer
