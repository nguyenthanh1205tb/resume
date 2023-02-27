import React, { PropsWithChildren } from 'react'
import { RouteComponentProps } from 'react-router'

type LoginPageProps = RouteComponentProps

function LoginPage(props: PropsWithChildren<LoginPageProps>) {
  return (
    <div className="rt-flex rt-justify-center">
      <div>
        <h1>Login Page</h1>
      </div>
    </div>
  )
}

export default React.memo(LoginPage)
