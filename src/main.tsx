import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./app/store"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { I18nextProvider } from "react-i18next"
import i18next from "./i18next.ts/i18next"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <I18nextProvider i18n={i18next}>
          <ToastContainer
            position="top-center"
            autoClose={4000}
            className="toastContainer"
            theme="light"
          />
          <Provider store={store}>
            <App />
          </Provider>
        </I18nextProvider>
      </BrowserRouter>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
