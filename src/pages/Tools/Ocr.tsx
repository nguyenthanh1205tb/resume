import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import ImgWatermark from 'src/assets/images/img-watermark.png'
import ImgConversion from 'src/assets/images/transfer.png'
import PageContainer from 'src/components/Common/Container/Page'
import Dropzone from 'src/components/Common/Dropzone'
// OCR TOOLS IMPORT FILE
import ImageToWord from 'src/components/OCRTools/Conversion'
import ImageWatermark from 'src/components/OCRTools/Watermark'
import { RecordKS, TOOLS } from 'src/configs/Types'
import { getParams } from 'src/helpers'

const listOCRTools = [
  {
    name: 'Image conversions',
    desc: 'Convert image to word or pdf',
    img: ImgConversion,
    key: TOOLS['img-convert-to-word&pdf'],
    disabled: false,
    path: `/ocr?tool=${TOOLS['img-convert-to-word&pdf']}&multi=true`,
  },
  {
    name: 'Add watermark image',
    desc: 'Add watermark for your image',
    img: ImgWatermark,
    key: TOOLS['img-watermark'],
    disabled: false,
    path: `/ocr?tool=${TOOLS['img-watermark']}&multi=false`,
  },
]

const TITLE_TOOLS: RecordKS<string> = {
  [TOOLS['img-convert-to-word&pdf']]: 'Image conversions',
  [TOOLS['img-watermark']]: 'Add watermark image',
}

function Ocr() {
  const history = useHistory()
  const [imgFile, setImgFile] = useState<File | null>()
  const [listImagesFiles, setListImgFiles] = useState<File[]>([])
  const [isMulti, setIsMulti] = useState<boolean>(false)
  const [nameTool, setNameTool] = useState<string>()

  const init = () => {
    const queries = getParams(history.location.search)
    const nt = queries.get('tool')
    const multi = queries.get('multi')
    if (nt) {
      setNameTool(nt)
    } else {
      history.push(`/ocr?tool=${TOOLS['img-convert-to-word&pdf']}&multi=true`)
    }
    if (multi) setIsMulti(multi === 'true' ? true : false)
  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    init()
  }, [history.location])

  const switchTool = (path: string) => {
    history.push(path)
    setImgFile(null)
    setListImgFiles([])
  }

  const onDrop = (f: File[]) => {
    if (isMulti) {
      setListImgFiles(f)
    } else {
      setImgFile(f[0])
    }
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">.OCR Tools.</h1>
        <p>Every tools you need to work in one place</p>
      </div>
      <div className="flex items-center justify-center space-x-4 mt-8">
        {listOCRTools.map((tool, index) => (
          <div
            key={index}
            className={classNames(
              'p-4 bg-slate-50/30 rounded-xl cursor-pointer h-auto md:h-36 border-2 border-gray-200 transition-all hover:border-blue-500 w-72',
              {
                'opacity-20 cursor-default': tool.disabled,
                '!bg-blue-500 !border-blue-500 text-white': tool.key === nameTool,
              },
            )}
            onClick={() => !tool.disabled && switchTool(tool.path)}>
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600">
                <img src={tool.img} className="w-5" />
              </div>
              <p className="ml-4 text-md font-semibold">{tool.name}</p>
            </div>
            <p
              className={classNames('text-sm mt-2 text-gray-500 font-normal', { 'text-white': tool.key === nameTool })}>
              {tool.desc}
            </p>
          </div>
        ))}
      </div>
      <PageContainer>
        <div className="my-8 md:mb-16">
          <div className="w-4/5 min-h-16 bg-white m-auto rounded-xl p-8">
            <p className="text-2xl font-semibold">
              Optical character recognition - {nameTool && TITLE_TOOLS[nameTool]}
            </p>
            <p>Click to upload or drag and drop file(s) to zone bellow.</p>
            <Dropzone
              onDrop={onDrop}
              accept={{ 'image/jpeg': ['.jpg', '.png'] }}
              small={imgFile || listImagesFiles.length ? true : false}
              multiple={isMulti}
            />
            <div className="mt-8">
              {listImagesFiles.length ? (
                <div>
                  {nameTool === TOOLS['img-convert-to-word&pdf'] ? <ImageToWord files={listImagesFiles} /> : null}
                </div>
              ) : null}
              {imgFile ? <ImageWatermark file={imgFile} /> : null}
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
export default Ocr
