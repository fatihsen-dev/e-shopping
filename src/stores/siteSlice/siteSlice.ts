import { initialState } from "./initialState"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../index"

export const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload
      localStorage.setItem("theme", JSON.stringify(state.darkMode))
    },
    changeStatus: (state, action: PayloadAction<boolean | null>) => {
      state.status = action.payload
    },
    loadAddress: (state, action: PayloadAction<Address[]>) => {
      state.address = action.payload
      localStorage.setItem("address", JSON.stringify(state.address))
    },
  },
})

export const { changeTheme, changeStatus, loadAddress } = siteSlice.actions
export const siteSelector = (state: RootState) => state.site
export default siteSlice.reducer
