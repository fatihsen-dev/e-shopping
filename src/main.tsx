import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles/reset.scss"
import "./i18n"
import { Provider } from "react-redux"
import { store } from "./stores"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
