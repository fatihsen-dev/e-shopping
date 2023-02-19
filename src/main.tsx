import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles/scss/index.scss"
import "./i18n"
import { Provider } from "react-redux"
import { store } from "./stores"
import { BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
