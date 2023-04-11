import classNames from 'classnames'
import React, { PropsWithChildren, ReactNode } from 'react'
import { RecordKS } from 'src/configs/Types'

interface PDFPageProps {
  className?: string | RecordKS<boolean | undefined>
  primaryText?: string | ReactNode
}
function PDFPage({ children, className, primaryText }: PropsWithChildren<PDFPageProps>) {
  return (
    <div
      className={classNames(
        'relative w-full px-4 py-8 bg-white shadow-sm flex items-center justify-center h-48 cursor-pointer rounded-md border border-transparent hover:border-blue-500 transition-all hover:text-blue-500',
        className,
      )}>
      <div className="flex flex-col space-y-2 justify-center items-center text-sm font-semibold">
        {primaryText ? primaryText : <span>Page</span>}
        <span className="text-4xl">{children}</span>
      </div>
    </div>
  )
}
export default PDFPage
