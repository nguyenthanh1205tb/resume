import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import PrivateAuth from 'src/components/Auth/PrivateAuth'
import PublicAuth from 'src/components/Auth/PublicAuth'
import About from 'src/pages/About'
import NotFound from 'src/pages/Exception/NotFound'
import Portfolio from 'src/pages/Portfolio'
import Resume from 'src/pages/Resume'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/about" />} />
      <Route element={<PublicAuth />}>
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Route>
      {/* <Route path="/about" element={<About />} /> */}
      <Route path="/admin" element={<PrivateAuth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
export default Router
