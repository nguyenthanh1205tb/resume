import classNames from 'classnames'
import React, { PropsWithChildren } from 'react'
import { useDrop } from 'react-dnd'
import { RecordKS } from 'src/configs/Types'

interface DropBoxProps {
  onDrop: (item: RecordKS, boxNum: number) => void
  dependencies?: unknown[]
  boxPos: number
  className?: string
}
function DropBox({ onDrop, boxPos, className, children, dependencies }: PropsWithChildren<DropBoxProps>) {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: 'item',
      drop: (item: RecordKS) => onDrop(item, boxPos),
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    (dependencies ?? []).concat(boxPos),
  )

  return (
    <div
      className={classNames('border-2 border-dashed p-4 rounded-lg text-gray-500 text-xs text-center', className, {
        'border-blue-500': canDrop && isOver,
      })}
      ref={drop}>
      {children}
    </div>
  )
}
export default DropBox
