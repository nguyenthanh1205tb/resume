import { Dialog, Transition } from '@headlessui/react'
import classnames from 'classnames'
import React, { CSSProperties, Fragment, PropsWithChildren } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  classNames?: string
  styles?: CSSProperties
}
function Modal({ isOpen, children, onClose, classNames, styles }: PropsWithChildren<ModalProps>) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel
                className={classnames(
                  'transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all',
                  classNames,
                )}
                style={{ backgroundColor: 'var(--color-surface-1)', ...styles }}>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
