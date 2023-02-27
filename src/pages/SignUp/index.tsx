import React, { PropsWithChildren } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type RegisterPageProps = RouteComponentProps

function RegisterPage({}: PropsWithChildren<RegisterPageProps>) {
  return (
    <div>
      <h1>Register page</h1>
    </div>
  )
}

export default React.memo(RegisterPage)
