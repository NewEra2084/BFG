// сделали замечание про двойной запрос на сервер?? при инициализации - при разработке стоял Strict Mode - это норма, вроде...
// import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./styles/globals.css"
import "./styles/index.css"
import App from "./App.tsx"
import { Provider } from "react-redux"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { GlobalStore } from "./store/store.ts"

createRoot(document.getElementById("root")!).render(
    <ThemeProvider>
      <Provider store={GlobalStore}>
        <App />
      </Provider>
    </ThemeProvider>
)
