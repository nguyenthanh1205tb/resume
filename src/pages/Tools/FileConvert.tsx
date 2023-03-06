import React, { useCallback, useEffect, useState } from 'react'
import PageContainer from 'src/components/Common/Container/Page'
import Dropzone from 'src/components/Common/Dropzone'
import mime from 'mime'
import { observer } from 'mobx-react-lite'
import ToolStore from 'src/stores/ToolStore'
import { Accept } from 'react-dropzone'
import Table, { TableColumns, TableDataSources } from 'src/components/Common/Table'
import Select from 'react-select'
import DownloadPng from 'src/assets/images/download.png'
import ClosePng from 'src/assets/images/close.png'
import { BsArrowRight } from 'react-icons/bs'

function FileConvert() {
  const { filesAccepted, filesConvertible } = ToolStore
  const [accept, setAccept] = useState<Accept>()
  const [dataSources, setDataSources] = useState<TableDataSources>([])

  const onFileDrop = useCallback(
    (f: File[]) => {
      const _d = f.map(f => {
        const name = f.name
        const type = mime.getExtension(f.type)
        const size = (f.size / (1024 * 1024)).toFixed(2)
        return {
          filename: name,
          fileType: type,
          fileSize: size,
          file: f,
          converting: false,
          downloading: false,
        }
      })
      if (dataSources.length) {
        setDataSources(prev => [...prev, ..._d])
      } else {
        setDataSources(_d)
      }
    },
    [dataSources],
  )

  const removeFile = (index: number) => {
    const _d = dataSources.filter((_, i) => i !== index)
    setDataSources(_d)
  }

  const cols: TableColumns[] = [
    {
      label: 'File name',
      dataIndex: 'filename',
      key: 'filename',
      render: (v: any) => {
        return <div title={v.filename}>{(v.filename as string).slice(0, 15) + '...'}</div>
      },
    },
    {
      label: 'File type',
      dataIndex: 'fileType',
      key: 'fileType',
      render: (v: any) => '.' + v.fileType,
    },
    {
      label: 'File size',
      dataIndex: 'fileSize',
      key: 'fileSize',
      render: (v: any) => v.fileSize + 'MB',
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
      label: 'Choose convert file',
      dataIndex: 'action',
      key: 'action',
      render: (v: any, index: number) => {
        let op: { label: string; value: string }[] = []
        if (filesConvertible) {
          for (const k of Object.keys(filesConvertible)) {
            if (v.fileType === k) {
              op = filesConvertible[k].map(f => ({ label: f, value: f }))
              break
            }
          }
        }
        return (
          <div className="flex items-center">
            <Select className="flex-1" options={op} />
            <div className="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-md ml-8 cursor-pointer">
              <img className="w-6" src={DownloadPng} />
            </div>
            <div className="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-md ml-2 cursor-pointer">
              <img className="w-4" src={ClosePng} onClick={() => removeFile(index)} />
            </div>
          </div>
        )
      },
    },
  ]

  useEffect(() => {
    if (filesAccepted && filesAccepted.length) {
      filesAccepted.map(f => {
        const t = mime.getType(f)
        if (t) setAccept(prev => ({ ...prev, [t]: [`.${f}`] }))
      })
    }
  }, [filesAccepted])

  return (
    <PageContainer>
      <div className="my-8 md:my-16">
        <div className="lg:w-4/5 bg-white m-auto rounded-xl px-4 md:px-8 py-8">
          <p className="text-2xl font-semibold">File convert</p>
          <p>Click to upload or drag and drop file(s) to zone bellow to process file conversion.</p>
          <Dropzone onDrop={onFileDrop} accept={accept} small={dataSources.length ? true : false} />
          <div className="mt-8">{dataSources.length ? <Table cols={cols} dataSources={dataSources} /> : null}</div>
        </div>
      </div>
    </PageContainer>
  )
}
export default observer(FileConvert)
