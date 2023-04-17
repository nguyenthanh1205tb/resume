import classNames from 'classnames'
import React, { PropsWithChildren } from 'react'
import { useDrop } from 'react-dnd'
import { RecordKS } from 'src/configs/Types'

interface DropBoxProps {
  onDrop: (item: RecordKS, boxNum: number) => void
  boxNum: number
}
function DropBox({ onDrop, boxNum, children }: PropsWithChildren<DropBoxProps>) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'item',
    drop: (item: RecordKS) => {
      onDrop(item, boxNum)
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  return (
    <div
      className={classNames('border-2 border-dashed px-2 py-4 rounded-lg text-gray-500 text-xs text-center', {
        'border-blue-500': canDrop && isOver,
      })}
      ref={drop}>
      {children}
    </div>
  )
}
export default DropBox
