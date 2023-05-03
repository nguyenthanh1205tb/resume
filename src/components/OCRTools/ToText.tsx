/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames'
import mime from 'mime'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { BiError } from 'react-icons/bi'
import { BsArrowRight } from 'react-icons/bs'
import { CgSpinner } from 'react-icons/cg'

import DownloadWhitePng from 'src/assets/images/download-white.png'
import { RecordKS } from 'src/configs/Types'
import { createDownload } from 'src/helpers/Tools'
import { useImgToText } from 'src/hooks/useOcrAPI'

import ButtonSave from '../Common/Button/Save'
import Table, { TableColumns, TableDataSources } from '../Common/Table'

interface ToTextProps {
  files: File[]
}
function ToText({ files }: PropsWithChildren<ToTextProps>) {
  const { convertImageToText } = useImgToText()
  const [dataSource, setDataSources] = useState<TableDataSources>([])

  const setValueDataSources = (i: number, data: RecordKS) => {
    if (dataSource[i].loading) return
    setDataSources(prev => prev.slice(0).map((o, index) => (index === i ? { ...o, ...data } : o)))
  }

  const toWord = async (k: number, d: RecordKS) => {
    if (d.loading) return
    const result = convertImageToText({ clientImage: d.file as File })
    result.then(link => {
      if (link) {
        setValueDataSources(k, { link: link, loading: false })
      } else {
        setValueDataSources(k, { loading: false, error: true })
      }
    })
  }

  const onSave = () => {
    for (const key in dataSource) {
      const d = dataSource[key]
      toWord(parseInt(key), d)
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
      render: (v: any) => {
        return mime.getExtension(v.file.type)
      },
    },
    {
      label: '',
      dataIndex: 'to',
      key: 'to',
      render: () => (
        <div className="flex items-center justify-center">
          <BsArrowRight size={15} />
        </div>
      ),
    },
    {
      label: 'To',
      dataIndex: '',
      key: 'to-conversion',
      render: () => {
        return '.txt'
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
export default ToText
