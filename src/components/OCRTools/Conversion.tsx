/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { PropsWithChildren, useEffect, useState } from 'react'
import ButtonSave from '../Common/Button/Save'
import Table, { TableColumns, TableDataSources } from '../Common/Table'
import DownloadWhitePng from 'src/assets/images/download-white.png'
import { CgSpinner } from 'react-icons/cg'
import classNames from 'classnames'
import { RecordKS } from 'src/configs/Types'
import { BiError } from 'react-icons/bi'
import { createDownload } from 'src/helpers/Tools'
import mime from 'mime'
import Select from 'react-select'
import { BsArrowRight } from 'react-icons/bs'
import { useImgToPDF, useImgToWord } from 'src/hooks/useOcrAPI'

const CONVERT_OPTIONS = [
  {
    label: 'Docx',
    value: 'docx',
  },
  {
    label: 'PDF',
    value: 'pdf',
  },
]

interface ToWordProps {
  files: File[]
}
function ToWord({ files }: PropsWithChildren<ToWordProps>) {
  const { convertImgToWord } = useImgToWord()
  const { convertImgToPDF } = useImgToPDF()
  const [dataSource, setDataSources] = useState<TableDataSources>([])

  const setValueDataSources = (i: number, data: RecordKS) => {
    if (dataSource[i].loading) return
    setDataSources(prev => prev.slice(0).map((o, index) => (index === i ? { ...o, ...data } : o)))
  }

  const toWord = async (k: number, d: RecordKS) => {
    if (d.loading) return
    const result = convertImgToWord({ clientImage: d.file as File })
    result.then(link => {
      if (link) {
        setValueDataSources(k, { link: link, loading: false })
      } else {
        setValueDataSources(k, { loading: false, error: true })
      }
    })
  }

  const toPDF = async (k: number, d: RecordKS) => {
    if (d.loading) return
    const result = convertImgToPDF({ clientImage: d.file as File })
    result.then(link => {
      if (link) {
        setValueDataSources(k, { link: link, loading: false })
      } else {
        setValueDataSources(k, { loading: false, error: true })
      }
    })
  }

  const onSave = async () => {
    for (const key in dataSource) {
      const d = dataSource[key]
      const to = d.to
      if (!to || to === '') {
        setValueDataSources(parseInt(key), { loading: false, error: true, link: '' })
      } else {
        setValueDataSources(parseInt(key), { loading: true, error: false, link: '' })
        switch (to) {
          case 'docx':
            toWord(parseInt(key), d)
            break
          case 'pdf':
            toPDF(parseInt(key), d)
            break
        }
      }
    }
  }

  const setConversionTool = (i: number, v: string) => {
    setValueDataSources(i, { to: v })
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
      render: (v: any, i: number) => {
        return (
          <Select
            isDisabled={v.loading || v.link}
            styles={{
              container: base => ({ ...base, width: '150px' }),
              control: base => ({ ...base, borderColor: v.error ? '#ff3f3f' : '#dadada' }),
            }}
            className="flex-1"
            options={CONVERT_OPTIONS}
            classNames={{
              control: () =>
                classNames({
                  'animate__shakeX animate__animated animate__faster': v.error,
                }),
            }}
            onChange={v => v && setConversionTool(i, v.value)}
          />
        )
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
