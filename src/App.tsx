import React, { useEffect } from 'react'
import Router from './Router'
import AuthStore from './stores/AuthStore'

function App() {
  const { setUser } = AuthStore

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user && user !== 'undefined') {
      setUser(JSON.parse(user))
    }
  }, [])

  return <Router />
}

export default React.memo(App)
