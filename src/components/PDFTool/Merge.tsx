import React, { PropsWithChildren, useEffect, useState } from 'react'
import PDFPage from './page'
import { createDownload, swapTwoPages } from 'src/helpers/Tools'
import classNames from 'classnames'
import { PageSwap } from 'src/configs/Types'
import { useMergePDF } from 'src/hooks/useToolAPI'
import ButtonSave from '../Common/Button/Save'

interface MergeProps {
  files: File[]
}
function Merge({ files }: PropsWithChildren<MergeProps>) {
  const { response, mergePDF } = useMergePDF()
  const [list, setList] = useState<PageSwap[]>([])
  const [link, setLink] = useState<string>()

  useEffect(() => {
    const l: PageSwap[] = files.map((f, i) => ({ id: list.length + i, selected: false, file: f }))
    if (list.length) {
      setList(prev => [...prev, ...l])
    } else {
      setList(l)
    }
  }, [files])

  useEffect(() => {
    if (!response.loading && response.data) {
      setLink(response.data.data.link)
    }
  }, [response])

  const select = (id: number) => {
    if (response.loading) return
    const d = swapTwoPages(id, list)
    setList(d)
  }

  const onSave = () => {
    if (response.loading) return
    if (link) {
      return createDownload(link).download()
    } else {
      const files = list.map(o => o.file)
      return mergePDF({ files })
    }
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-8">
        {list.map((o, i) => (
          <div className="relative" key={i} onClick={() => select(o.id)}>
            {o.selected ? (
              <div className="bg-blue-500/20 absolute top-0 left-0 w-full h-full z-10 rounded-md cursor-pointer" />
            ) : null}
            <PDFPage className={classNames({ '!border-blue-500': o.selected })} primaryText="File">
              <p className="text-xs text-center">{o.file?.name}</p>
            </PDFPage>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <ButtonSave type={link ? 'success' : 'save'} onClick={onSave} className="w-full" loading={response.loading}>
          {link ? 'Download now' : 'Merge'}
        </ButtonSave>
      </div>
    </div>
  )
}
export default Merge
