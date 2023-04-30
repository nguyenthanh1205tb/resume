import classNames from 'classnames'
import React, { PropsWithChildren } from 'react'

interface PageContainerProps {
  fluid?: boolean
}
function PageContainer({ children, fluid }: PropsWithChildren<PageContainerProps>) {
  return (
    <div
      className={classNames('m-auto md:px-8 sm:px-4', { '!px-0': fluid })}
      style={{ maxWidth: !fluid ? '1024px' : '100%' }}>
      {children}
    </div>
  )
}
export default PageContainer
