import classNames from 'classnames'
import React, { PropsWithChildren } from 'react'
import { FiLoader } from 'react-icons/fi'

interface ButtonSaveProps {
  type?: 'save' | 'delete' | 'success' | 'outline' | 'text'
  onClick: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
}
function ButtonSave({ onClick, disabled, loading, className, type, children }: PropsWithChildren<ButtonSaveProps>) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'btn !border-0 flex items-center space-x-2',
        {
          '!btn-disabled ': disabled,
          '!bg-blue-500 !text-white': !type || type === 'save',
          '!bg-red-500 !text-white': type && type === 'delete',
          '!bg-emerald-500 !text-white': type && type === 'success',
          '!bg-transparent !border !border-gray-600 !text-black': type && type === 'outline',
          '!bg-transparent !text-black': type && type === 'text',
        },
        className,
      )}>
      {loading ? <FiLoader size={24} className="animate-spin text-white" /> : null}
      <div>{children}</div>
    </button>
  )
}
export default ButtonSave
