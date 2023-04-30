import classNames from 'classnames'
import mime from 'mime'
import { PDFDocumentProxy } from 'pdfjs-dist'
import React, { useEffect, useState } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { BsArrowRightCircle } from 'react-icons/bs'
import { FiLoader } from 'react-icons/fi'
import { Document, LoadingProcessData, Page, pdfjs } from 'react-pdf'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import PageContainer from 'src/components/Common/Container/Page'
import Dropzone from 'src/components/Common/Dropzone'
import DeletePDFPages from 'src/components/PDFTools/Delete'
import ExtractImage from 'src/components/PDFTools/ExtractImage'
import Merge from 'src/components/PDFTools/Merge'
import Protect from 'src/components/PDFTools/Protect'
import RemoveImage from 'src/components/PDFTools/RemoveImage'
import Rotate from 'src/components/PDFTools/Rotate'
import SignPDF from 'src/components/PDFTools/Sign'
import Sort from 'src/components/PDFTools/Sort'
import Split from 'src/components/PDFTools/Split'
import ToWord from 'src/components/PDFTools/ToWord'
import Unlock from 'src/components/PDFTools/Unlock'
// PDF TOOLS IMPORT FILE
import Watermark from 'src/components/PDFTools/Watermark'
import { RecordKS, TOOLS } from 'src/configs/Types'
import { getParams } from 'src/helpers'
import ToolStore from 'src/stores/ToolStore'

const TITLE_TOOLS: RecordKS<string> = {
  [TOOLS.merge]: 'Merge',
  [TOOLS.delete]: 'Delete pages',
  [TOOLS.split]: 'Split',
  [TOOLS.watermark]: 'Watermark',
  [TOOLS.rotate]: 'Rotate',
  [TOOLS.unlock]: 'Unlock',
  [TOOLS.protect]: 'Protect',
  [TOOLS.organize]: 'Organize',
  [TOOLS['to-word']]: 'Convert PDF to Word',
  [TOOLS.sort]: 'Sort',
  [TOOLS['extract-images']]: 'Extract Images',
  [TOOLS.sign]: 'Sign PDF',
  [TOOLS['remove-images']]: 'Remove Images',
}

function PdfTool() {
  const { tools } = ToolStore
  const history = useHistory()
  const [pdfFile, setPDFFile] = useState<File | File>()
  const [listPDFFiles, setListPDFFiles] = useState<File[]>([])
  const [totalPages, setTotalPages] = useState<number>()
  const [page, setPage] = useState<number>(1)
  const [nameTool, setNameTool] = useState<string>()
  const [isMulti, setIsMulti] = useState<boolean>(false)
  const [loadingProgress, setLoadingProgress] = useState<number>(0)
  const [openPDFDocument, setOpenPDFDocument] = useState<boolean>(false)

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js'
    const queries = getParams(history.location.search)
    const nt = queries.get('tool')
    const multi = queries.get('multi')
    if (nt) setNameTool(nt)
    if (multi) setIsMulti(multi === 'true' ? true : false)
  }, [])

  useEffect(() => {
    const body = document.querySelector('body')
    if (!body) return
    if (openPDFDocument) {
      body.style.overflow = 'hidden'
    } else {
      body.style.overflow = 'auto'
    }
  }, [openPDFDocument])

  const onDrop = (f: File[]) => {
    if (isMulti) {
      setListPDFFiles(f)
    } else {
      setPDFFile(f[0])
    }
  }

  const onLoadPDFSuccess = (p: PDFDocumentProxy) => {
    setTotalPages(p.numPages)
  }

  const onLoadPDFFailure = (err: Error) => {
    // eslint-disable-next-line no-console
    console.log('upload file failure', { err })
    toast('Can not load file, please try again')
  }

  const onLoadingPDF = async (p: LoadingProcessData) => {
    setLoadingProgress((p.loaded / p.total) * 100)
  }

  const findDesc = (tool: string) => {
    return tools.filter(o => o.key === tool)[0].desc
  }

  const closePDF = () => {
    setOpenPDFDocument(false)
  }

  return (
    <PageContainer>
      <div className="my-8 md:my-16">
        <div className="lg:w-4/5 bg-white m-auto rounded-xl px-4 md:px-8 py-8">
          <div className="mb-8 flex flex-col space-y-1">
            <p className="text-2xl font-semibold">{nameTool ? TITLE_TOOLS[nameTool] : 'Undefined tool'}</p>
            <p className="text-sm text-gray-500">{nameTool ? findDesc(nameTool) : null}</p>
          </div>
          <p>Click to upload or drag and drop file(s) to zone bellow to use.</p>
          <Dropzone
            onDrop={onDrop}
            accept={{ [mime.getType('pdf') ?? '']: ['.pdf'] }}
            small={pdfFile || listPDFFiles.length ? true : false}
            multiple={isMulti}
          />
          {pdfFile || listPDFFiles.length ? (
            <div className="mt-8 bg-gray-50 min-h-16 rounded-xl p-8">
              {pdfFile ? (
                <>
                  <div className="flex items-center space-x-4">
                    <div className="">
                      <p className="text-sm font-medium whitespace-nowrap text-emerald-500">{pdfFile.name}</p>
                    </div>
                    {loadingProgress < 100 ? (
                      <FiLoader size={20} className="animate-spin text-yellow-500" />
                    ) : (
                      <AiFillCheckCircle size={20} color="#37d399" />
                    )}
                  </div>
                  {totalPages ? (
                    <>
                      {nameTool === TOOLS.delete ? (
                        <DeletePDFPages file={pdfFile} totalPages={totalPages} loading={loadingProgress < 100} />
                      ) : null}
                      {nameTool === TOOLS.watermark ? (
                        <Watermark file={pdfFile} loading={loadingProgress < 100} />
                      ) : null}
                      {nameTool === TOOLS.sort ? (
                        <Sort file={pdfFile} totalPages={totalPages} loading={loadingProgress < 100} />
                      ) : null}
                      {nameTool === TOOLS.rotate ? <Rotate file={pdfFile} loading={loadingProgress < 100} /> : null}
                      {nameTool === TOOLS.sign ? (
                        <SignPDF
                          file={pdfFile}
                          loading={loadingProgress < 100}
                          openPDFDocument={(b: boolean) => setOpenPDFDocument(b)}
                        />
                      ) : null}
                      {nameTool === TOOLS.split ? (
                        <Split file={pdfFile} totalPages={totalPages} loading={loadingProgress < 100} />
                      ) : null}
                    </>
                  ) : null}
                  <div
                    className={classNames('fixed hidden overflow-auto bg-white w-full h-full top-0 left-0 z-10 p-4', {
                      '!block': openPDFDocument,
                    })}>
                    <div className="flex text-2xl pl-20 space-x-4">
                      <div className="cursor-pointer" onClick={closePDF}>
                        <AiFillCloseCircle size={36} />
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="cursor-pointer">
                          <BsArrowLeftCircle size={30} />
                        </div>
                        <p>Page 1/{totalPages}</p>
                        <div className="cursor-pointer">
                          <BsArrowRightCircle size={30} />
                        </div>
                      </div>
                    </div>
                    <Document
                      file={pdfFile}
                      onLoadSuccess={onLoadPDFSuccess}
                      onLoadError={onLoadPDFFailure}
                      onLoadProgress={onLoadingPDF}
                      loading="">
                      {nameTool === TOOLS.sign ? (
                        <Page scale={1.5} pageNumber={page} renderTextLayer={false} renderAnnotationLayer={false} />
                      ) : null}
                    </Document>
                  </div>
                </>
              ) : null}
              {listPDFFiles.length ? (
                <>
                  {nameTool === TOOLS.protect ? <Protect files={listPDFFiles} /> : null}
                  {nameTool === TOOLS.merge ? <Merge files={listPDFFiles} /> : null}
                  {nameTool === TOOLS.unlock ? <Unlock files={listPDFFiles} /> : null}
                  {nameTool === TOOLS['to-word'] ? <ToWord files={listPDFFiles} /> : null}
                  {nameTool === TOOLS['extract-images'] ? <ExtractImage files={listPDFFiles} /> : null}
                  {nameTool === TOOLS['remove-images'] ? <RemoveImage files={listPDFFiles} /> : null}
                </>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </PageContainer>
  )
}
export default PdfTool
