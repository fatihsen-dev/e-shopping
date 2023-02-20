import React, { useEffect } from "react"
import styles from "./App.module.scss"
import Navbar from "./components/Navbar/Navbar"
import { useAppDispatch, useAppSelector } from "./stores/hook"
import { Route, Routes } from "react-router-dom"
import Products from "./pages/Products"
import Favorites from "./pages/Favorites"
import Cart from "./pages/Cart"
import Account from "./pages/Account/Account"
import { requestAllProducts } from "./axios"
import { loadAllProducts } from "./stores/storeSlice/shopSlice"
import { changeStatus } from "./stores/siteSlice/siteSlice"
import Error from "./pages/Error"
import { Toaster } from "react-hot-toast"

export default function App() {
  const { darkMode, status } = useAppSelector((state) => state.site)
  const dispatch = useAppDispatch()

  useEffect(() => {
    darkMode ? document.body.classList.add("dark") : document.body.classList.remove("dark")
  }, [darkMode])

  useEffect(() => {
    getAllProducts()
  }, [])

  const getAllProducts = async () => {
    try {
      const response = await requestAllProducts()
      dispatch(loadAllProducts({ products: response.data }))
      dispatch(changeStatus(true))
    } catch (error) {
      console.log(error)
      dispatch(changeStatus(false))
    }
  }

  return (
    <>
      {status === true && (
        <>
          <div className={styles.app}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </div>
          <Toaster position="top-right" reverseOrder={false} />
        </>
      )}
      {status === false && (
        <>
          <Error />
          <Toaster position="top-right" reverseOrder={false} />
        </>
      )}
      {status === null && (
        <>
          <div />
          <Toaster position="top-right" reverseOrder={false} />
        </>
      )}
    </>
  )
}
