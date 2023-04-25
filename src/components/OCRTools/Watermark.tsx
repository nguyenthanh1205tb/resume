import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { FiLoader } from 'react-icons/fi'
import { FaRegDotCircle } from 'react-icons/fa'
import { WatermarkListLinkDownload } from 'src/configs/Types'
import { BiError } from 'react-icons/bi'
import ButtonSave from '../Common/Button/Save'
import { useImgWatermark } from 'src/hooks/useOcrAPI'

interface ImgWatermarkProps {
  file: File
}
function ImgWatermark({ file }: PropsWithChildren<ImgWatermarkProps>) {
  const { addImgWatermark, response } = useImgWatermark()
  const [text, setText] = useState<string>()
  const watermarkEl = useRef<HTMLDivElement>(null)
  const [linkDownload, setLinkDownload] = useState<WatermarkListLinkDownload[]>([])
  const [imgUrl, setImgUrl] = useState<string>()

  useEffect(() => {
    convertFileToLink(file)
  }, [])

  useEffect(() => {
    const wEl = watermarkEl.current
    if (wEl && text) {
      wEl.dataset.watermark = (wEl.dataset.watermark + '   ').repeat(300)
    }
  }, [text])

  const updateLinkDownload = (position: number, data: Partial<WatermarkListLinkDownload>) => {
    setLinkDownload(prev =>
      prev.map((o, i) => {
        if (i === position) {
          return { ...o, ...data }
        }
        return o
      }),
    )
  }

  const convertFileToLink = (f: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(f)
    reader.onload = function () {
      setImgUrl(reader.result as string)
    }
  }

  const addWatermark = async () => {
    if (!text || !text.length) return
    const length = linkDownload.slice(0).length
    setLinkDownload(prev => [...prev, { fileName: file.name, text: text, loading: true, link: '', err: false }])
    const result = await addImgWatermark({
      clientImage: file,
      msg: text,
    })
    if (result) {
      updateLinkDownload(length, { link: result, loading: false })
    } else {
      updateLinkDownload(length, { err: true })
    }
  }

  return (
    <div className="mt-4 divide-y">
      <div className="flex flex-col items-center space-y-8">
        <div className="w-full">
          <div className="relative">
            <img src={imgUrl} className="w-full rounded-lg" />
            <div
              ref={watermarkEl}
              data-watermark={text ?? ''}
              className="absolute w-full h-full top-0 left-0 watermarked"></div>
          </div>
        </div>
        <div className="form-control w-full">
          <p className="mb-2 text-sm text-gray-500">Write your watermark here:</p>
          <input
            type="text"
            onChange={e => setText(e.target.value)}
            placeholder="Type text here"
            className="input input-bordered w-full"
          />
        </div>
      </div>
      <div className="mt-8 pt-8">
        <div className="flex w-full justify-start items-center">
          <ButtonSave type="save" onClick={addWatermark} disabled={!text || !text.length}>
            Add watermark
          </ButtonSave>
        </div>
        {linkDownload.length ? (
          <div className="mt-4 flex flex-col space-y-2">
            <p className="text-sm italic">Click to download</p>
            <ul className="flex flex-col space-y-2 divide-y divide-gray-50">
              {linkDownload.map((l, index) => (
                <li key={index} className="w-full pt-1">
                  <a
                    className="flex items-center space-x-2 whitespace-nowrap overflow-hidden text-ellipsis hover:text-blue-400 transition-all"
                    rel="noreferrer"
                    href={l.link === '' ? '#' : l.link}
                    target="_blank">
                    {l.err ? (
                      <BiError className="text-red-500" />
                    ) : l.loading ? (
                      <FiLoader className="animate-spin text-yellow-500" />
                    ) : (
                      <FaRegDotCircle className="text-emerald-500" />
                    )}
                    <p>{l.fileName}</p>
                    <p>-</p>
                    <p className="font-semibold">{l.text}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}
export default ImgWatermark
