import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/scss/global.scss';
import { createHead } from "unhead";
import { HeadProvider } from "@unhead/react";;

const head = createHead();

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeadProvider head={head}>
      <App />
    </HeadProvider>
  </StrictMode>,
)
