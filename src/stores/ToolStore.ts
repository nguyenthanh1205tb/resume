import { action, computed, makeAutoObservable, observable, toJS } from 'mobx'
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
import SortImg from 'src/assets/images/sort.png'
import ExtractImg from 'src/assets/images/extract.png'
import { FILE_TYPES } from 'src/configs/Types'
import _find from 'lodash/find'

const tools = [
  {
    name: 'Merge PDF',
    desc: 'Combine PDFs in the order you want with the easiest PDF merger available.',
    img: MergeImg,
    type: FILE_TYPES.pdf,
  },
  {
    name: 'Split PDF',
    desc: 'Separate one page or a whole set for easy conversion into independent PDF files.',
    img: CutImg,
    type: FILE_TYPES.pdf,
  },
  {
    name: 'Watermark',
    desc: 'Stamp an image or text over your PDF in seconds. Choose the typography, transparency and position.',
    img: WatermarkImg,
    type: FILE_TYPES.pdf,
  },
  {
    name: 'Rotate PDF',
    desc: 'Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!',
    img: RotateImg,
    type: FILE_TYPES.pdf,
  },
  {
    name: 'Unlock PDF',
    desc: 'Remove PDF password security, giving you the freedom to use your PDFs as you want.',
    img: UnlockImg,
    type: FILE_TYPES.pdf,
  },
  {
    name: 'Protect PDF',
    desc: 'Protect PDF files with a password. Encrypt PDF documents to prevent unauthorized access.',
    img: ProtectImg,
    type: FILE_TYPES.pdf,
  },
  {
    name: 'Organize PDF',
    desc: 'Sort pages of your PDF file however you like. Delete PDF pages or add PDF pages to your document at your convenience.',
    img: OrganizeImg,
    type: FILE_TYPES.pdf,
  },
  {
    name: 'PDF to Word',
    desc: 'Easily convert your PDF files into easy to edit DOCX documents. The converted WORD document is almost 100% accurate.',
    img: ConvertImg,
    type: FILE_TYPES.pdf,
  },
  {
    name: 'Delete pages PDF',
    desc: 'Easily remove a page or some pages in PDF document.',
    img: DeleteImg,
    type: FILE_TYPES.pdf,
  },
  {
    name: 'Sort pages PDF',
    desc: 'Sort pages of PDF document.',
    img: SortImg,
    type: FILE_TYPES.pdf,
  },
  {
    name: 'Extract PDF',
    desc: 'Extract PDF pages from your PDF document.',
    img: ExtractImg,
    type: FILE_TYPES.pdf,
  },
  {
    name: 'Sign PDF',
    desc: 'Sign a document and request signatures. Draw your signature or sign PDF files with a certificate-based digital ID.',
    img: SignImg,
    type: FILE_TYPES.pdf,
  },
  {
    name: 'Text to PDF',
    desc: 'Convert Text to PDF',
    img: DocumentImg,
    type: FILE_TYPES.file,
  },
  {
    name: 'Text to DOCX',
    desc: 'Convert Text to DOCX',
    img: DocumentImg,
    type: FILE_TYPES.file,
  },
  {
    name: 'XLSX to PDF',
    desc: 'Convert XLSX to PDF',
    img: DocumentImg,
    type: FILE_TYPES.file,
  },
  {
    name: 'DOCX to others',
    desc: 'Convert XLSX to (epub, ODT, OTT, PDF, RTF, TXT)',
    img: DocumentImg,
    type: FILE_TYPES.file,
  },
]
class ToolStore {
  @observable private _tools = tools

  constructor() {
    makeAutoObservable(this)
  }

  @computed get tools() {
    return toJS(this._tools)
  }

  @action toolsFilter = (t: FILE_TYPES) => {
    if (!t && t === '') return
    const _tools = this._tools.filter(o => o.type === t)
    if (_tools.length) {
      this._tools = _tools
    } else {
      this._tools = tools
    }
  }

  @action toolsSearch = (t: string) => {
    if (t === '') return (this._tools = tools)
    const _tools = this._tools.filter(o => o.name.toLowerCase().indexOf(t) > -1)
    this._tools = _tools
  }
}

export default new ToolStore()
