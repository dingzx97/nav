import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import App from "./App.tsx"
import { SITE_CONFIG } from "./data/site"

import "./index.css"

document.title = SITE_CONFIG.title
document
  .querySelector('meta[name="description"]')
  ?.setAttribute("content", SITE_CONFIG.description)
document
  .querySelector('meta[property="og:title"]')
  ?.setAttribute("content", SITE_CONFIG.title)
document
  .querySelector('meta[property="og:description"]')
  ?.setAttribute("content", SITE_CONFIG.description)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
