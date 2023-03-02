import React, { PropsWithChildren } from 'react'
import PageContainer from 'src/components/Common/Container/Page'
import Dropzone from 'src/components/Common/Dropzone'

interface OcrProps {}
function Ocr({}: PropsWithChildren<OcrProps>) {
  return (
    <PageContainer>
      <div className="my-8 md:my-16">
        <div className="w-4/5 min-h-16 bg-white m-auto rounded-xl p-8">
          <p className="text-2xl font-semibold">Optical character recognition</p>
          <p>Click to upload or drag and drop file(s) to zone bellow.</p>
          <Dropzone />
        </div>
      </div>
    </PageContainer>
  )
}
export default Ocr
