import React, { PropsWithChildren, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import classNames from 'classnames'
import UploadImg from 'src/assets/images/upload.png'

interface DropzoneProps {}
function Dropzone({}: PropsWithChildren<DropzoneProps>) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles)
  }, [])
  const { getInputProps, getRootProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div
      {...getRootProps()}
      className={classNames(
        'bg-gray-50 w-full rounded-xl mt-8 border-dashed border-2 flex items-center justify-center cursor-pointer',
        {
          'border-blue-500': isDragActive,
        },
      )}
      style={{ height: '400px' }}>
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-2">
        <img src={UploadImg} />
        <p>
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-sm text-gray-500">Any documentation files (MAX. 2 MB per file)</p>
      </div>
    </div>
  )
}
export default Dropzone
