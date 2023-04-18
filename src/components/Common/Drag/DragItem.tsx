import classNames from 'classnames'
import React, { PropsWithChildren, useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { RecordKS } from 'src/configs/Types'

interface DragItemProps {
  item: RecordKS
  className?: string
}
function DragItem({ item, className }: PropsWithChildren<DragItemProps>) {
  const [_, drag] = useDrag(
    () => ({
      type: 'item',
      item,
      collect: monitor => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [item],
  )

  return (
    <div
      ref={drag}
      className={classNames('py-4 px-4 font-semibold cursor-pointer hover:bg-blue-50 drag-item', className)}>
      Page {item.id as string}
    </div>
  )
}
export default DragItem
