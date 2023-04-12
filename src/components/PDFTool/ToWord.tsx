import React, { PropsWithChildren, useEffect, useState } from 'react'
import { usePDFToWord } from 'src/hooks/useToolAPI'
import ButtonSave from '../Common/Button/Save'
import Table, { TableColumns, TableDataSources } from '../Common/Table'
import DownloadWhitePng from 'src/assets/images/download-white.png'
import { CgSpinner } from 'react-icons/cg'
import classNames from 'classnames'
import { RecordKS } from 'src/configs/Types'
import { BiError } from 'react-icons/bi'
import { createDownload } from 'src/helpers/Tools'

interface ToWordProps {
  files: File[]
}
function ToWord({ files }: PropsWithChildren<ToWordProps>) {
  const { pdfToWord, response } = usePDFToWord()
  const [dataSource, setDataSources] = useState<TableDataSources>([])

  const setValueDataSources = (i: number, data: RecordKS) => {
    if (dataSource[i].loading) return
    setDataSources(prev => prev.slice(0).map((o, index) => (index === i ? { ...o, ...data } : o)))
  }

  const onSave = async () => {
    if (response.loading) return
    for (const key in dataSource) {
      const d = dataSource[key]
      setValueDataSources(parseInt(key), { loading: true, error: false, link: '' })
      const result = pdfToWord({ file: d.file })
      result.then(res => {
        if (res) {
          setValueDataSources(parseInt(key), { link: res.link, loading: false })
        } else {
          setValueDataSources(parseInt(key), { loading: false, error: true })
        }
      })
    }
  }

  const cols: TableColumns[] = [
    {
      label: 'File name',
      dataIndex: 'filename',
      key: 'filename',
      render: (v: any) => {
        return <div title={v.filename}>{v.filename}</div>
      },
    },
    {
      label: 'From',
      dataIndex: '',
      key: 'from',
      render: () => {
        return 'PDF'
      },
    },
    {
      label: 'To',
      dataIndex: '',
      key: 'to',
      render: () => {
        return 'Docx'
      },
    },
    {
      label: '',
      dataIndex: '',
      key: '',
      render: (v: any) => {
        return (
          <div className={classNames('opacity-0', { 'opacity-100': v.loading || v.link !== '' || v.error })}>
            <div className="w-6">
              <div
                onClick={() => v.link !== '' && createDownload(v.link).download()}
                className={classNames('w-8 h-8 rounded-md flex items-center justify-center cursor-pointer', {
                  'bg-emerald-500': !v.error,
                  'bg-red-500': v.error,
                })}>
                {v.loading ? <CgSpinner className="animate-spin text-white" size={20} /> : null}
                {v.error ? <BiError className="text-white" size={20} /> : null}
                {v.link !== '' ? <img src={DownloadWhitePng} className="w-6" /> : null}
              </div>
            </div>
          </div>
        )
      },
    },
  ]

  useEffect(() => {
    const d = files.map(f => ({ filename: f.name, file: f, loading: false, link: '', error: false }))
    setDataSources(d)
  }, [files])

  return (
    <>
      <Table className="!min-h-fit" cols={cols} dataSources={dataSource} />
      <div className="flex justify-end">
        <ButtonSave className="w-48 mt-8 !capitalize" onClick={onSave}>
          convert all files
        </ButtonSave>
      </div>
    </>
  )
}
export default ToWord
