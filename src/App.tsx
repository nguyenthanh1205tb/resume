// import jscookie from 'js-cookie'
import { observer } from 'mobx-react'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'src/assets/icons/style-custome-icons.css'

import Router from './Router'

// import LoadingPage from './components/Common/Loading/Page'
// import CommonStore from './stores/CommonStore'

// import CommonStore from './stores/CommonStore'

function App() {
  // const { loadingPage, setLoadingPage } = CommonStore

  return (
    <>
      {/* {loadingPage && <LoadingPage />} */}
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
