import classNames from 'classnames'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { useSortPDFPages } from 'src/hooks/useToolAPI'
import ButtonSave from '../Common/Button/Save'
import PDFPage from './page'

interface SortProps {
  file: File
  loading?: boolean
  totalPages: number
}
function Sort({ totalPages, ...props }: PropsWithChildren<SortProps>) {
  const { sortPDFPages, response } = useSortPDFPages()
  const [list, setList] = useState<{ id: number; selected: boolean }[]>([])

  useEffect(() => {
    setList(Array.from(Array(totalPages)).map((_, i) => ({ id: i, selected: false })))
  }, [totalPages])

  const select = (id: number) => {
    if (response.loading) return
    const i_first = list.findIndex(o => o.selected)
    const i_swap = list.findIndex(o => o.id === id)
    if (i_first >= 0) {
      const _list = list.slice(0)
      const first = list[i_first]
      const swap = list[i_swap]
      _list[i_first] = swap
      _list[i_swap] = { ...first, selected: false }
      setList(_list)
    } else {
      setList(prev => prev.map(o => (o.id === id ? { ...o, selected: !o.selected } : o)))
    }
  }

  const onSave = () => {
    if (response.loading) return
    const query = list.map(o => o.id).join(',')
    sortPDFPages(query, { file: props.file })
  }

  return (
    <div className="mt-8">
      <div className="grid grid-cols-4 gap-8">
        {list.map((o, i) => (
          <div className="relative" key={i} onClick={() => select(o.id)}>
            {o.selected ? (
              <div className="bg-blue-500/20 absolute top-0 left-0 w-full h-full z-10 rounded-md cursor-pointer" />
            ) : null}
            <PDFPage className={classNames({ '!border-blue-500': o.selected })}>{o.id}</PDFPage>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <ButtonSave className="w-full" onClick={onSave} type="save" loading={response.loading}>
          Save
        </ButtonSave>
      </div>
    </div>
  )
}
export default Sort
