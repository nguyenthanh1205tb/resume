import React, { PropsWithChildren, useEffect, useState } from 'react'
import { GrRotateLeft, GrRotateRight } from 'react-icons/gr'

import { createDownload } from 'src/helpers/Tools'
import { useRotatePDF } from 'src/hooks/usePdfAPI'

import ButtonSave from '../Common/Button/Save'
import PDFPage from './page'

interface RotateProps {
  file: File
  loading?: boolean
}
function Rotate({ file }: PropsWithChildren<RotateProps>) {
  const { rotatePDF, response } = useRotatePDF()
  const [deg, setDeg] = useState<number>(0)
  const [link, setLink] = useState<string>()

  const rotate = (n: number) => {
    if (response.loading) return
    const d = deg + n
    setDeg(d)
  }

  const onRotate = async () => {
    if (response.loading) return
    const d = deg % 360
    const angle = d === 270 ? -90 : d === -270 ? 90 : Math.abs(d)
    const result = await rotatePDF(angle, { file: file })
    if (result) {
      setLink(result)
    }
  }

  const onSave = () => {
    if (link) {
      createDownload(link).download()
    } else {
      onRotate()
    }
  }

  useEffect(() => {
    setDeg(0)
    setLink(undefined)
  }, [file])

  return (
    <div className="mt-8">
      <div className="w-full flex items-center justify-center space-x-16">
        <div
          className="btn !p-0 w-12 h-12 flex items-center justify-center !bg-white cursor-pointer !shadow-sm rounded-xl"
          onClick={() => rotate(90)}>
          <GrRotateRight className="text-black" size={25} />
        </div>
        <div
          className={`w-36 transition-all border-t-2 border-blue-500 rounded-md`}
          style={{ transform: `rotate(${deg}deg)` }}>
          <PDFPage />
        </div>
        <div
          className="btn !p-0 w-12 h-12 flex items-center justify-center !bg-white cursor-pointer !shadow-sm rounded-xl"
          onClick={() => rotate(-90)}>
          <GrRotateLeft className="text-black" size={25} />
        </div>
      </div>
      <ButtonSave className="w-full mt-8" onClick={onSave} loading={response.loading} type={link ? 'success' : 'save'}>
        {link ? 'Download' : 'Save'}
      </ButtonSave>
    </div>
  )
}
export default Rotate
