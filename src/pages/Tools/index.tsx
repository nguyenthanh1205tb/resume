import React, { PropsWithChildren } from 'react'
import MergeImg from 'src/assets/images/merge.png'
import CutImg from 'src/assets/images/cut.png'
import DeleteImg from 'src/assets/images/bin.png'
import ConvertImg from 'src/assets/images/convert.png'
import OrganizeImg from 'src/assets/images/layers.png'
import RotateImg from 'src/assets/images/rotate.png'
import ProtectImg from 'src/assets/images/protect.png'
import SignImg from 'src/assets/images/sign.png'
import UnlockImg from 'src/assets/images/unlock.png'
import WatermarkImg from 'src/assets/images/watermark.png'
import DocumentImg from 'src/assets/images/document.png'
import { useHistory } from 'react-router-dom'

interface ToolsProps {}

function Tools({}: PropsWithChildren<ToolsProps>) {
  const history = useHistory()

  const tools = [
    {
      name: 'Merge PDF',
      desc: 'Combine PDFs in the order you want with the easiest PDF merger available.',
      img: MergeImg,
    },
    {
      name: 'Split PDF',
      desc: 'Separate one page or a whole set for easy conversion into independent PDF files.',
      img: CutImg,
    },
    {
      name: 'Watermark',
      desc: 'Stamp an image or text over your PDF in seconds. Choose the typography, transparency and position.',
      img: WatermarkImg,
    },
    {
      name: 'Rotate PDF',
      desc: 'Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!',
      img: RotateImg,
    },
    {
      name: 'Unlock PDF',
      desc: 'Remove PDF password security, giving you the freedom to use your PDFs as you want.',
      img: UnlockImg,
    },
    {
      name: 'Protect PDF',
      desc: 'Protect PDF files with a password. Encrypt PDF documents to prevent unauthorized access.',
      img: ProtectImg,
    },
    {
      name: 'Organize PDF',
      desc: 'Sort pages of your PDF file however you like. Delete PDF pages or add PDF pages to your document at your convenience.',
      img: OrganizeImg,
    },
    {
      name: 'PDF to Word',
      desc: 'Easily convert your PDF files into easy to edit DOCX documents. The converted WORD document is almost 100% accurate.',
      img: ConvertImg,
    },
    {
      name: 'Delete pages PDF',
      desc: 'Easily remove a page or some pages in PDF document.',
      img: DeleteImg,
    },
    {
      name: 'Sign PDF',
      desc: 'Sign a document and request signatures. Draw your signature or sign PDF files with a certificate-based digital ID.',
      img: SignImg,
    },
    {
      name: 'Excel to PDF',
      desc: 'Convert Excel to PDF',
      img: DocumentImg,
    },
    {
      name: 'XML to JSON',
      desc: 'Convert XML to JSON',
      img: DocumentImg,
    },
    {
      name: 'Excel to XML',
      desc: 'Convert Excel to XML',
      img: DocumentImg,
    },
  ]

  const randomNumber = () => {
    return Math.floor(Math.random() * 5)
  }

  const randomColorInRangeColors = () => {
    const colors = ['bg-indigo-400', 'bg-blue-400', 'bg-indigo-400', 'bg-pink-400', 'bg-emerald-400']
    return colors[randomNumber()]
  }

  return (
    <div className="m-auto px-8 sm:px-4" style={{ maxWidth: '1024px' }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="p-4 bg-slate-50 rounded-xl cursor-pointer drop-shadow-sm h-auto md:h-36"
            onClick={() => history.push('/file-convert')}>
            <div className="flex items-center">
              <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${randomColorInRangeColors()}`}>
                <img src={tool.img} className="w-5" />
              </div>
              <p className="ml-4 text-md font-semibold">{tool.name}</p>
            </div>
            <p className="text-xs mt-2 text-gray-400 font-light">{tool.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.memo(Tools)
