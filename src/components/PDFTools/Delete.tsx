import React, { PropsWithChildren, useState } from 'react'
import { useDeletePDFPages } from 'src/hooks/usePdfAPI'
import ButtonSave from '../Common/Button/Save'
import PDFPage from './page'

interface DeletePDFPagesProps {
  totalPages: number
  loading?: boolean
  file: File
}
function DeletePDFPages({ totalPages, file }: PropsWithChildren<DeletePDFPagesProps>) {
  const { deletePDFPages, response } = useDeletePDFPages()
  const [selected, setSelected] = useState<Array<number>>([])

  const select = (page: number) => {
    const p = page + 1
    setSelected(prev => {
      const n = [...prev, p]
      if (prev.includes(p)) {
        const d = prev.slice(0).filter(o => o !== p)
        return d
      }
      return n
    })
  }

  const onDelete = () => {
    if (response.loading) return
    deletePDFPages(selected, { file: file })
  }

  return (
    <div className="mt-8">
      <div className="grid grid-cols-4 gap-8">
        {Array.from(Array(totalPages)).map((_, i) => (
          <div key={i} onClick={() => select(i)}>
            <PDFPage className={{ '!border-red-500': selected.includes(i + 1) }}>{i + 1}</PDFPage>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-8">
        <ButtonSave
          loading={response.loading}
          type="delete"
          onClick={onDelete}
          disabled={!selected.length}
          className="!capitalize">
          Delete selected pages
        </ButtonSave>
      </div>
    </div>
  )
}
export default DeletePDFPages
