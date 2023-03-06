import React, { PropsWithChildren } from 'react'

interface PageContainerProps {}
function PageContainer({ children }: PropsWithChildren<PageContainerProps>) {
  return (
    <div className="m-auto md:px-8 sm:px-4" style={{ maxWidth: '1024px' }}>
      {children}
    </div>
  )
}
export default PageContainer
