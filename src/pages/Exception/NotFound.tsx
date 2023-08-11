import React, { PropsWithChildren } from 'react'

interface NotFoundProps {}
function NotFound({}: PropsWithChildren<NotFoundProps>) {
  return <div>404 not found</div>
}
export default NotFound
