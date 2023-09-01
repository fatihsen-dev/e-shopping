import axios from "axios"
const HTTP = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const requestAllProducts = async () => await HTTP.get("/products")
