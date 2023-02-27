import React, { Fragment, PropsWithChildren } from 'react'

interface AuthProps {}

function Auth({ children }: PropsWithChildren<AuthProps>) {
  return <Fragment>{children}</Fragment>
}

export default React.memo(Auth)
