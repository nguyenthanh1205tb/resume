import classNames from 'classnames'
import mime from 'mime'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useState } from 'react'
import { Accept } from 'react-dropzone'
import { BsArrowRight } from 'react-icons/bs'
import Select from 'react-select'
import { toast } from 'react-toastify'

import ClosePng from 'src/assets/images/close.png'
import DownloadWhitePng from 'src/assets/images/download-white.png'
import DownloadPng from 'src/assets/images/download.png'
import SpinLoadingSVG from 'src/assets/images/spin.svg'
import PageContainer from 'src/components/Common/Container/Page'
import Dropzone from 'src/components/Common/Dropzone'
import Table, { TableColumns, TableDataSources } from 'src/components/Common/Table'
import { ConvertFileToAnyResponse } from 'src/configs/Types'
import { createDownload } from 'src/helpers/Tools'
import { useConvertFileToAny } from 'src/hooks/usePdfAPI'
import AuthStore from 'src/stores/AuthStore'
import ToolStore from 'src/stores/ToolStore'
import { CancelablePromise } from 'src/utils/request/core/CancelablePromise'

function FileConvert() {
  const { isLogin } = AuthStore
  const { filesAccepted, filesConvertible } = ToolStore
  const { convertFileToAny } = useConvertFileToAny()
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
          downloadable: false,
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

  const setFileConverting = (index: number, b = false) => {
    return setDataSources(prev => prev.map((o, i) => (i === index ? { ...o, converting: b } : o)))
  }

  const setFileDownloadable = (index: number, b = false) => {
    return setDataSources(prev => prev.map((o, i) => (i === index ? { ...o, downloadable: b } : o)))
  }

  const setLinkDownloadable = (index: number, link: string | undefined) => {
    return setDataSources(prev => prev.map((o, i) => (i === index ? { ...o, link: link } : o)))
  }

  const setConvertTypeSelectedError = (index: number, e = false) => {
    return setDataSources(prev => prev.map((o, i) => (i === index ? { ...o, convertTypeSelectedError: e } : o)))
  }

  const removeFile = (index: number) => {
    const _d = dataSources.filter((_, i) => i !== index)
    setDataSources(_d)
  }

  const cancelRequest = (req: CancelablePromise<ConvertFileToAnyResponse> | undefined, index?: number) => {
    if (req) req.cancel()
    if (typeof index === 'number') setFileConverting(index)
  }

  const setFileReq = (index: number, req: CancelablePromise<ConvertFileToAnyResponse> | undefined) => {
    return setDataSources(prev => prev.map((o, i) => (i === index ? { ...o, req: req } : o)))
  }

  const isHaveConvertingFile = () => {
    const _d = dataSources.slice(0).filter(o => o.converting === true)
    return _d.length > 0 ? true : false
  }

  const selectConvertType = (index: number, type: string) => {
    const _d = dataSources
      .slice(0)
      .map((o, i) => (i === index ? { ...o, convertTypeSelected: type, convertTypeSelectedError: false } : o))
    setDataSources(_d)
  }

  const convert = async (f: File, format: string, index: number) => {
    if (!isLogin()) {
      toast('You need login to use this feature', { type: 'error' })
      return
    }
    if (dataSources[index].converting) {
      cancelRequest(dataSources[index].req, index)
      return
    }
    if (!format || format === '') {
      setConvertTypeSelectedError(index, true)
      return
    }

    setFileConverting(index, true)
    const req = convertFileToAny({ file: f, toFormat: format })
    setFileReq(index, req)
    const result = await req
    if (result && result.data.link) {
      setFileDownloadable(index, true)
      setLinkDownloadable(index, result.data.link)
    }
    setFileConverting(index)
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
      label: 'File size',
      dataIndex: 'fileSize',
      key: 'fileSize',
      render: (v: any) => v.fileSize + 'MB',
    },
    {
      label: 'File type',
      dataIndex: 'fileType',
      key: 'fileType',
      render: (v: any) => '.' + v.fileType,
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
            <Select
              isDisabled={v.converting || v.link}
              styles={{
                container: base => ({ ...base, width: '100px' }),
                control: base => ({ ...base, borderColor: v.convertTypeSelectedError ? '#ff3f3f' : '#dadada' }),
              }}
              className="flex-1"
              options={op}
              classNames={{
                control: () =>
                  classNames({
                    'animate__shakeX animate__animated animate__faster': v.convertTypeSelectedError,
                  }),
              }}
              onChange={v => v && selectConvertType(index, v.value)}
            />
            <div
              className={classNames(
                'w-9 h-9 flex items-center justify-center bg-gray-100 rounded-md ml-8 cursor-pointer border border-transparent',
                {
                  '!bg-emerald-500': v.link,
                  'hover:border-red-500': v.converting,
                },
              )}
              onClick={() =>
                v.link ? createDownload(v.link).download() : convert(v.file, v.convertTypeSelected, index)
              }>
              <img
                className={classNames('w-6', { 'animate-spin': v.converting })}
                src={v.converting ? SpinLoadingSVG : v.link ? DownloadWhitePng : DownloadPng}
              />
            </div>
            <div
              className={classNames(
                'w-9 h-9 flex items-center justify-center bg-gray-100 rounded-md ml-2 cursor-pointer transition-all',
                {
                  'opacity-30 cursor-not-allowed': isHaveConvertingFile(),
                },
              )}
              onClick={() => !isHaveConvertingFile() && removeFile(index)}>
              <img className="w-4" src={ClosePng} />
            </div>
          </div>
        )
      },
    },
  ]

  useEffect(() => {
    if (filesAccepted && filesAccepted.length) {
      const acp: Accept = {}
      filesAccepted.map(f => {
        const t = mime.getType(f)
        if (t) acp[t] = [`.${f}`]
      })
      setAccept(acp)
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
