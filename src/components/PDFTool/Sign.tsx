import React, { PropsWithChildren } from 'react'
import SignatureCv from 'react-signature-canvas'

interface SignPDFProps {
  file: File
  loading?: boolean
}
function SignPDF({ file, loading }: PropsWithChildren<SignPDFProps>) {
  return (
    <div className="mt-8">
      <p>Draw your text to make a signature</p>
      <div className="bg-white rounded-md mt-4 shadow-sm">
        <SignatureCv penColor="black" canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} />
      </div>
    </div>
  )
}
export default SignPDF
