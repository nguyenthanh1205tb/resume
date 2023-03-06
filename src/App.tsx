import React, { useEffect } from 'react'
import { useGetProfile } from './hooks/useUserAPI'
import Router from './Router'
import jscookie from 'js-cookie'
import { useGetListFilesConversion } from './hooks/useFileAPI'

function App() {
  const { getProfile } = useGetProfile()
  const { getListFilesConversion } = useGetListFilesConversion()

  useEffect(() => {
    const token = jscookie.get('token')
    if (token && token !== 'undefined') {
      getProfile()
    }
    getListFilesConversion()
  }, [])

  return <Router />
}

export default App
