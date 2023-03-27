import React, { PropsWithChildren } from 'react'
import classNames from 'classnames'
import { FiLoader } from 'react-icons/fi'

interface ButtonSaveProps {
  type?: 'save' | 'delete'
  onClick: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
}
function ButtonSave({ onClick, disabled, loading, className, type, children }: PropsWithChildren<ButtonSaveProps>) {
  return (
    <button
      onClick={onClick}
      className={classNames('btn !text-white !border-0 flex items-center space-x-2', className, {
        '!btn-disabled': disabled,
        '!bg-blue-500': !type || type === 'save',
        '!bg-red-500': type && type === 'delete',
      })}>
      {loading ? <FiLoader size={24} className="animate-spin text-white" /> : null}
      <div>{children}</div>
    </button>
  )
}
export default ButtonSave
