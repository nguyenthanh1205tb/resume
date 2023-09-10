import classnames from 'classnames'
import React, { PropsWithChildren } from 'react'
interface BadgedProjectProps {
  type?: 'info' | 'warn' | 'error'
}
function BadgedProject({ children, type = 'info' }: PropsWithChildren<BadgedProjectProps>) {
  return (
    <div
      className={classnames('text-xs py-1 px-2 rounded-md', {
        'bg-blue-500': type === 'info',
        'bg-yellow-500': type === 'warn',
        'bg-red-500': type === 'error',
      })}>
      {children}
    </div>
  )
}
export default BadgedProject
