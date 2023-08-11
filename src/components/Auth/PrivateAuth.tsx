import { observer } from 'mobx-react-lite'
import React, { Fragment, PropsWithChildren } from 'react'

interface PrivateAuth {}

function PrivateAuth({ children, ...props }: PropsWithChildren<PrivateAuth>) {
  console.log('private', props)
  return <Fragment>{children}</Fragment>
}
export default observer(PrivateAuth)
