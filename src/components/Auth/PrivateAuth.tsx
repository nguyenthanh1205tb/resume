import { observer } from 'mobx-react-lite'
import React, { Fragment, PropsWithChildren, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'

import AuthStore from 'src/stores/AuthStore'

interface PrivateAuth extends RouteComponentProps {}

function PrivateAuth({ children, history }: PropsWithChildren<PrivateAuth>) {
  const { isLogin } = AuthStore

  useEffect(() => {
    if (!isLogin()) {
      history.push('/tools')
    }
  }, [])

  return <Fragment>{children}</Fragment>
}
export default observer(PrivateAuth)
