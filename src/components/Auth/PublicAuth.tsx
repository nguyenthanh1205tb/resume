import { observer } from 'mobx-react-lite'
import React, { Fragment, PropsWithChildren, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import AuthStore from 'src/stores/AuthStore'

interface AuthProps extends RouteComponentProps {}

function PublicAuth({ children, history }: PropsWithChildren<AuthProps>) {
  const { isLogin } = AuthStore
  useEffect(() => {
    if (isLogin()) history.push('/tools')
  })
  return <Fragment>{children}</Fragment>
}

export default observer(PublicAuth)
