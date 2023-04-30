import jscookie from 'js-cookie'
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Router from './Router'
import LoadingPage from './components/Common/Loading/Page'
import { useGetProfile } from './hooks/useUserAPI'
import CommonStore from './stores/CommonStore'

function App() {
  const { getProfile } = useGetProfile()
  const { loadingPage, setLoadingPage } = CommonStore

  useEffect(() => {
    const token = jscookie.get('token')
    if (token && token !== 'undefined') {
      setLoadingPage(true)
      getProfile().finally(() => setLoadingPage(false))
    }
  }, [])

  return (
    <>
      {loadingPage && <LoadingPage />}
      <ToastContainer
        position="top-right"
        hideProgressBar
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="st-toast-container"
        bodyClassName="st-toast-body"
        theme="colored"
        limit={5}
      />
      <Router />
    </>
  )
}

export default observer(App)
