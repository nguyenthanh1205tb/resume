import React, { useEffect } from 'react'
import { useGetProfile } from './hooks/useUserAPI'
import Router from './Router'
import jscookie from 'js-cookie'
import { useGetListFilesConversion } from './hooks/useFileAPI'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import LoadingPage from './components/Common/Loading/Page'
import CommonStore from './stores/CommonStore'
import { observer } from 'mobx-react'

function App() {
  const { getProfile, response: profileResponse } = useGetProfile()
  const { getListFilesConversion, response } = useGetListFilesConversion()
  const { loadingPage, setLoadingPage } = CommonStore

  useEffect(() => {
    if (!response.loading && !profileResponse.loading) {
      setLoadingPage(false)
    }
  }, [response, profileResponse])

  useEffect(() => {
    setLoadingPage(true)
    const token = jscookie.get('token')
    if (token && token !== 'undefined') {
      getProfile()
    }
    getListFilesConversion()
  }, [])

  return (
    <>
      {loadingPage && <LoadingPage />}
      <ToastContainer
        position="bottom-left"
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
