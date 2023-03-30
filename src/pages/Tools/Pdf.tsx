import React, { useEffect, useState } from 'react'
import PageContainer from 'src/components/Common/Container/Page'
import Dropzone from 'src/components/Common/Dropzone'
import { Document, pdfjs } from 'react-pdf'
import mime from 'mime'
import { PDFDocumentProxy } from 'pdfjs-dist'
import { useHistory } from 'react-router-dom'
import { getParams } from 'src/helpers'
import { RecordKS, TOOLS } from 'src/configs/Types'
import DeletePDFPages from 'src/components/PDFTool/Delete'
import Watermark from 'src/components/PDFTool/Watermark'
import { AiFillCheckCircle } from 'react-icons/ai'
import { FiLoader } from 'react-icons/fi'
import Sort from 'src/components/PDFTool/Sort'
import Rotate from 'src/components/PDFTool/Rotate'
import Protect from 'src/components/PDFTool/Protect'

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
  [TOOLS.extract]: 'Extract',
  [TOOLS.sign]: 'Sign PDF',
}

function PdfTool() {
  const history = useHistory()
  const [pdfFile, setPDFFile] = useState<File | File>()
  const [listPDFFiles, setListPDFFiles] = useState<File[]>([])
  const [totalPages, setTotalPages] = useState<number>()
  const [nameTool, setNameTool] = useState<string>()
  const [isMulti, setIsMulti] = useState<boolean>(false)
  const [loadingProgress, setLoadingProgress] = useState<number>(0)

  const onDrop = (f: File[]) => {
    if (isMulti) {
      if (listPDFFiles.length) {
        setListPDFFiles(prev => [...prev, ...f])
      } else {
        setListPDFFiles(f)
      }
    } else {
      setPDFFile(f[0])
    }
  }

  const onLoadPDFSuccess = (p: PDFDocumentProxy) => {
    setTotalPages(p.numPages)
  }

  const onLoadPDFFailure = (err: Error) => {
    console.log('upload file failure', err)
  }

  const onLoadingPDF = async (p: any) => {
    setLoadingProgress((p.loaded / p.total) * 100)
  }

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js'
    const queries = getParams(history.location.search)
    const nt = queries.get('tool')
    const multi = queries.get('multi')
    if (nt) setNameTool(nt)
    if (multi) setIsMulti(multi === 'true' ? true : false)
  }, [])

  return (
    <PageContainer>
      <div className="my-8 md:my-16">
        <div className="lg:w-4/5 bg-white m-auto rounded-xl px-4 md:px-8 py-8">
          <p className="text-2xl font-semibold">{nameTool ? TITLE_TOOLS[nameTool] : 'Undefined tool'}</p>
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
                  <Document
                    file={pdfFile}
                    onLoadSuccess={onLoadPDFSuccess}
                    onLoadError={onLoadPDFFailure}
                    onLoadProgress={onLoadingPDF}
                    loading=""
                  />
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
                      {nameTool === TOOLS.rotate ? (
                        <Rotate file={pdfFile} totalPages={totalPages} loading={loadingProgress < 100} />
                      ) : null}
                    </>
                  ) : null}
                </>
              ) : null}
              {listPDFFiles.length ? <>{nameTool === TOOLS.protect ? <Protect files={listPDFFiles} /> : null}</> : null}
            </div>
          ) : null}
        </div>
      </div>
    </PageContainer>
  )
}
export default PdfTool
