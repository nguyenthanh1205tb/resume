import React, { useEffect } from 'react'
import { useGetProfile } from './hooks/useUserRequest'
import Router from './Router'
import jscookie from 'js-cookie'

function App() {
  const { getProfile } = useGetProfile()

  useEffect(() => {
    const token = jscookie.get('token')
    if (token && token !== 'undefined') {
      getProfile()
    }
  }, [])

  return <Router />
}

export default App
