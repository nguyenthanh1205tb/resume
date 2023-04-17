import React, { PropsWithChildren, useEffect } from 'react'
import { useDrag } from 'react-dnd'

interface DragItemProps {
  pageNum: number
}
function DragItem({ pageNum }: PropsWithChildren<DragItemProps>) {
  const [_, drag] = useDrag(() => ({
    type: 'item',
    item: { id: pageNum },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  return (
    <div ref={drag} className="py-4 px-4 font-semibold cursor-pointer hover:bg-blue-50">
      Page {pageNum + +1}
    </div>
  )
}
export default DragItem
