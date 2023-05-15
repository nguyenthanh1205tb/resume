import { action, computed, makeAutoObservable, observable, toJS } from 'mobx'

import DeleteImg from 'src/assets/images/bin.png'
import ConvertImg from 'src/assets/images/convert.png'
import CutImg from 'src/assets/images/cut.png'
import ExtractImg from 'src/assets/images/extract.png'
import MergeImg from 'src/assets/images/merge.png'
import ProtectImg from 'src/assets/images/protect.png'
import RemoveImg from 'src/assets/images/remove-img.png'
// import OrganizeImg from 'src/assets/images/layers.png'
import RotateImg from 'src/assets/images/rotate.png'
import SignImg from 'src/assets/images/sign.png'
import SortImg from 'src/assets/images/sort.png'
import UnlockImg from 'src/assets/images/unlock.png'
import WatermarkImg from 'src/assets/images/watermark.png'
import { FILE_TYPES, ListFilesConversion } from 'src/configs/Types'
import { organizeListFilesConvertibles } from 'src/helpers/Tools'

const tools = [
  {
    name: 'Merge PDF',
    desc: 'Combine PDFs in the order you want with the easiest PDF merger available.',
    img: MergeImg,
    type: FILE_TYPES.pdf,
    key: 'merge',
    disabled: false,
    path: '/pdf-tools?tool=merge&multi=true',
  },
  {
    name: 'Split PDF',
    desc: 'Separate one page or a whole set for easy conversion into independent PDF files.',
    img: CutImg,
    type: FILE_TYPES.pdf,
    key: 'split',
    disabled: false,
    path: '/pdf-tools?tool=split',
  },
  {
    name: 'Watermark',
    desc: 'Stamp an image or text over your PDF in seconds. Choose the typography, transparency and position.',
    img: WatermarkImg,
    type: FILE_TYPES.pdf,
    key: 'watermark',
    disabled: false,
    path: '/pdf-tools?tool=watermark',
  },
  {
    name: 'Rotate PDF',
    desc: 'Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!',
    img: RotateImg,
    type: FILE_TYPES.pdf,
    key: 'rotate',
    disabled: false,
    path: '/pdf-tools?tool=rotate',
  },
  {
    name: 'Unlock PDF',
    desc: 'Remove PDF password security, giving you the freedom to use your PDFs as you want.',
    img: UnlockImg,
    type: FILE_TYPES.pdf,
    key: 'unlock',
    disabled: false,
    path: '/pdf-tools?tool=unlock&multi=true',
  },
  {
    name: 'Protect PDF',
    desc: 'Protect PDF files with a password. Encrypt PDF documents to prevent unauthorized access.',
    img: ProtectImg,
    type: FILE_TYPES.pdf,
    key: 'protect',
    disabled: false,
    path: '/pdf-tools?tool=protect&multi=true',
  },
  // {
  //   name: 'Organize PDF',
  //   desc: 'Sort pages of your PDF file however you like. Delete PDF pages or add PDF pages to your document at your convenience.',
  //   img: OrganizeImg,
  //   type: FILE_TYPES.pdf,
  //   key: 'organize',
  //   disabled: true,
  //   path: '/pdf-tools?tool=organize',
  // },
  {
    name: 'PDF to Word',
    desc: 'Easily convert your PDF files into easy to edit DOCX documents.',
    img: ConvertImg,
    type: FILE_TYPES.pdf,
    key: 'to-word',
    disabled: false,
    path: '/pdf-tools?tool=to-word&multi=true',
  },
  {
    name: 'Delete pages PDF',
    desc: 'Easily remove a page or some pages in PDF document.',
    img: DeleteImg,
    type: FILE_TYPES.pdf,
    key: 'delete',
    disabled: false,
    path: '/pdf-tools?tool=delete',
  },
  {
    name: 'Sort pages PDF',
    desc: 'Sort pages of PDF document.',
    img: SortImg,
    type: FILE_TYPES.pdf,
    key: 'sort',
    disabled: false,
    path: '/pdf-tools?tool=sort',
  },
  {
    name: 'Extract Images',
    desc: 'Extract images from your PDF document.',
    img: ExtractImg,
    type: FILE_TYPES.pdf,
    key: 'extract-images',
    disabled: false,
    path: '/pdf-tools?tool=extract-images&multi=true',
  },
  {
    name: 'Remove Images',
    desc: 'Remove images from your PDF document.',
    img: RemoveImg,
    type: FILE_TYPES.pdf,
    key: 'remove-images',
    disabled: false,
    path: '/pdf-tools?tool=remove-images&multi=true',
  },
  {
    name: 'Sign PDF',
    desc: 'Sign a document and request signatures. Draw your signature or sign PDF files with a certificate-based digital ID.',
    img: SignImg,
    type: FILE_TYPES.pdf,
    key: 'sign',
    disabled: false,
    path: '/pdf-tools?tool=sign',
  },
]
class ToolStore {
  @observable private _tools = tools
  @observable private _listFilesConversion: ListFilesConversion | null = null
  @observable private _filesConvertible: ListFilesConversion | null = null
  @observable private _filesAccepted: Array<string> | null = null
  @observable private _listSignatures: Array<string> = []

  constructor() {
    makeAutoObservable(this)
  }

  @computed get tools() {
    return toJS(this._tools)
  }

  @computed get listFilesConversion() {
    return toJS(this._listFilesConversion)
  }

  @computed get filesConvertible() {
    return toJS(this._filesConvertible)
  }

  @computed get filesAccepted() {
    return toJS(this._filesAccepted)
  }

  @computed get listSignatures() {
    return toJS(this._listSignatures)
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

  @action setListSignatures = (list: Array<string>) => {
    this._listSignatures = list
  }

  @action setListFilesConversion = async (lfc: ListFilesConversion) => {
    const f = await organizeListFilesConvertibles(lfc)
    this._listFilesConversion = lfc
    this._filesConvertible = f.ListFilesConvertibles
    this._filesAccepted = f.listFileAccepted
  }
}

export default new ToolStore()
