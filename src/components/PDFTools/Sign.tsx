import React, { PropsWithChildren, useRef, useState } from 'react'
import SignatureCv from 'react-signature-canvas'

import ToolStore from 'src/stores/ToolStore'

import ButtonSave from '../Common/Button/Save'

interface SignPDFProps {
  file: File
  loading?: boolean
  openPDFDocument: (b: boolean) => void
}
function SignPDF({ openPDFDocument }: PropsWithChildren<SignPDFProps>) {
  const { setListSignatures } = ToolStore
  const signRef = useRef<SignatureCv>(null)
  const [listSigns, setListSigns] = useState<string[]>([])

  const clearSignature = () => {
    if (!signRef.current) return
    return signRef.current.clear()
  }

  const getSignature = () => {
    if (!signRef.current) return
    const s = signRef.current.toDataURL('image/png')
    setListSigns(prev => [...prev, s])
    clearSignature()
  }

  const applySignatureToPDF = () => {
    setListSignatures(listSigns)
    openPDFDocument(true)
  }

  return (
    <div className="mt-8 relative mb-8">
      <p>Draw your text to make a signature</p>
      <div className="rounded-md mt-4 shadow-lg bg-white">
        <SignatureCv penColor="black" canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} ref={signRef} />
      </div>
      <div className="flex items-center space-x-4 mt-4">
        <ButtonSave onClick={getSignature} className="flex-1">
          Save
        </ButtonSave>
        <ButtonSave type="delete" onClick={clearSignature} className="flex-1">
          Clear
        </ButtonSave>
      </div>
      {listSigns.length ? (
        <div className="mt-8">
          <p className="mb-2">Your list signatures</p>
          <div className="grid grid-cols-3 gap-4 ">
            {listSigns.map((sign, i) => (
              <div key={i} className="shadow-sm bg-white cursor-pointer border border-gray-100 rounded-lg">
                <img src={sign} />
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <ButtonSave onClick={applySignatureToPDF} className="mt-8" type="text">
              Next step
            </ButtonSave>
          </div>
        </div>
      ) : null}
    </div>
  )
}
export default SignPDF
