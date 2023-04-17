import React, { PropsWithChildren, useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { BsArrowLeftRight } from 'react-icons/bs'
import DragItem from '../Common/Drag/DragItem'
import DropBox from '../Common/Drag/DropBox'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { RecordKS } from 'src/configs/Types'

interface SplitProps {
  file: File
  totalPages: number
  loading?: boolean
}
function Split({ file, loading, totalPages }: PropsWithChildren<SplitProps>) {
  const [list, setList] = useState<RecordKS[]>([])
  const [splitPage, setSplitPage] = useState<RecordKS[][]>([[]])

  useEffect(() => {
    setList(Array.from(Array(totalPages)).map((f, i) => ({ id: i })))
  }, [totalPages])

  const onDrop = (item: RecordKS, boxNum: number) => {
    console.log('drop id = ', item.id)
    console.log('box id = ', boxNum)
    setList(prev => prev.filter(o => o.id !== item.id))
    const sp = splitPage.slice(0).map((o, i) => (i === boxNum ? [...o, item] : o))
    console.log(sp)
    setSplitPage(sp)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative mt-8">
        <div className="flex space-x-2">
          <div className="w-60 h-96 bg-white shadow-sm overflow-auto rounded-lg">
            <div className="divide-y divide-dashed">
              {list.map((item, i) => (
                <DragItem pageNum={item.id as number} key={i} />
              ))}
            </div>
          </div>
          <div className="w-10 self-center flex justify-center">
            <BsArrowLeftRight size={25} />
          </div>
          <div className="h-96 flex-1 bg-white shadow-sm p-4 rounded-lg">
            {splitPage.map((sp, i) => (
              <DropBox key={i} onDrop={onDrop} boxNum={i}>
                {sp.length ? (
                  sp.map((item, k) => <DragItem key={k} pageNum={item.id as number} />)
                ) : (
                  <p>Drag and drop your page here to create group</p>
                )}
              </DropBox>
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  )
}
export default Split
