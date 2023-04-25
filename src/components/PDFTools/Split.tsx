import React, { PropsWithChildren, useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { BsArrowLeftRight } from 'react-icons/bs'
import DragItem from '../Common/Drag/DragItem'
import DropBox from '../Common/Drag/DropBox'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { RecordKS } from 'src/configs/Types'
// import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { IoIosCloseCircle } from 'react-icons/io'
import ButtonSave from '../Common/Button/Save'
import { useSplitPDF } from 'src/hooks/usePdfAPI'

interface SplitProps {
  file: File
  totalPages: number
  loading?: boolean
}
function Split({ file, totalPages }: PropsWithChildren<SplitProps>) {
  const { splitPDF, response } = useSplitPDF()
  const [list, setList] = useState<RecordKS[]>([])
  const [splitFile, setSplitFile] = useState<RecordKS[][]>([[]])

  useEffect(() => {
    setList(Array.from(Array(totalPages)).map((_, i) => ({ id: i + 1, boxPos: -1 })))
    setSplitFile([[]])
  }, [totalPages])

  useEffect(() => {
    if (splitFile[splitFile.length - 1].length > 0) {
      setSplitFile(prev => [...prev, []])
    }
  }, [splitFile])

  const dropToFile = (item: RecordKS, boxPos: number) => {
    if (typeof item.boxPos === 'number' && item.boxPos === boxPos) return
    if (list.length) setList(prev => prev.filter(o => o.id !== item.id))
    setSplitFile(prev =>
      prev.map((o, i) => {
        if (i === boxPos) {
          return [...o, { ...item, boxPos }]
        }
        if (item.boxPos !== -1 && item.boxPos === i) {
          return [...o].filter(o => o.id !== item.id)
        }
        return o
      }),
    )
  }

  const dropOnBacklog = (item: RecordKS) => {
    if (typeof item.boxPos === 'number' && item.boxPos < 0) return
    const boxPos = item.boxPos as number
    const box = splitFile[boxPos].filter(o => o.id !== item.id)
    setSplitFile(prev => prev.map((o, i) => (i === boxPos ? box : o)))
    setList(prev => [...prev, { ...item, boxPos: -1 }])
  }

  const onRemoveSplitPage = (boxPos: number) => {
    setSplitFile(prev => prev.filter((_, i) => i !== boxPos))
  }

  const onSave = () => {
    splitPDF({ file, ranges: splitFile.filter(o => o.length) })
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative mt-8">
        <div className="flex space-x-2">
          <DropBox
            dependencies={[splitFile, list]}
            onDrop={dropOnBacklog}
            boxPos={-1}
            className="!p-0 !text-left !font-medium !text-black !text-base bg-white">
            <div className="w-60 bg-white overflow-auto rounded-lg">
              <div className="divide-y divide-dashed">
                {list.map((item, i) => (
                  <DragItem item={item} key={i} />
                ))}
              </div>
            </div>
          </DropBox>
          <div className="w-10 self-center flex justify-center">
            <BsArrowLeftRight size={25} />
          </div>
          <div className="flex-1 bg-white shadow-sm p-4 rounded-lg flex flex-col space-y-4">
            {splitFile.map((sp, i) => (
              <div key={i}>
                <DropBox
                  dependencies={[splitFile, list]}
                  onDrop={dropToFile}
                  boxPos={i}
                  className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center p-2 cursor-pointer text-gray-500">
                    <p className="text-sm">Box {i + 1}</p>
                    {sp.length <= 0 && splitFile.length > 1 ? (
                      <IoIosCloseCircle size={20} onClick={() => onRemoveSplitPage(i)} />
                    ) : null}
                  </div>
                  {sp.length ? (
                    sp.map((item, k) => <DragItem key={k} item={item} className="border rounded-lg" />)
                  ) : (
                    <p className="italic">Drag and drop your page here</p>
                  )}
                </DropBox>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <ButtonSave onClick={onSave} loading={response.loading} type="save" className="!capitalize w-full">
            Save to split
          </ButtonSave>
        </div>
      </div>
    </DndProvider>
  )
}
export default Split
