import classNames from 'classnames'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { createDownload, swapTwoPages } from 'src/helpers/Tools'
import { useSortPDFPages } from 'src/hooks/usePdfAPI'
import ButtonSave from '../Common/Button/Save'
import PDFPage from './page'
import { PageSwap } from 'src/configs/Types'

interface SortProps {
  file: File
  loading?: boolean
  totalPages: number
}
function Sort({ totalPages, ...props }: PropsWithChildren<SortProps>) {
  const { sortPDFPages, response, clean } = useSortPDFPages()
  const [list, setList] = useState<PageSwap[]>([])

  useEffect(() => {
    setList(Array.from(Array(totalPages)).map((f, i) => ({ id: i, selected: false, file: f })))
  }, [totalPages])

  const select = (id: number) => {
    if (response.loading) return
    const d = swapTwoPages(id, list)
    setList(d)
  }

  const onSave = () => {
    if (response.loading) return
    const query = list.map(o => o.id + 1).join(',')
    sortPDFPages(query, { file: props.file })
  }

  useEffect(() => {
    clean()
  }, [props.file])

  return (
    <>
      <p className="mb-8 italic text-gray-500">Click any page to select and click the second page to swap them</p>
      <div className="grid grid-cols-4 gap-8">
        {list.map((o, i) => (
          <div className="relative" key={i} onClick={() => select(o.id)}>
            {o.selected ? (
              <div className="bg-blue-500/20 absolute top-0 left-0 w-full h-full z-10 rounded-md cursor-pointer" />
            ) : null}
            <PDFPage className={classNames({ '!border-blue-500': o.selected })}>{o.id + 1}</PDFPage>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <ButtonSave
          className="w-full"
          onClick={() => {
            if (response.data) {
              createDownload(response.data.link).download()
            } else {
              onSave()
            }
          }}
          type={response.data ? 'success' : 'save'}
          loading={response.loading}>
          {response.data ? 'Click to download' : 'Save'}
        </ButtonSave>
      </div>
    </>
  )
}
export default Sort
