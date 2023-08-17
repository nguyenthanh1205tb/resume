/* eslint-disable @typescript-eslint/no-non-null-assertion */
import 'animate.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import 'tailwindcss/tailwind.css'

import App from './App'
import './assets/css/bootstrap.min.css'
import './assets/icons/feather.css'
import './index.css'
import reportWebVitals from './reportWebVitals'
import i18next from './utils/i18next'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <BrowserRouter>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </BrowserRouter>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
