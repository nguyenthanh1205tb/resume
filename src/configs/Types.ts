export type RecordKS<D = unknown> = Record<string, D>

export enum ErrorStatusMessage {
  UN_AUTHORIZE = 'Please login to use this feature.',
  SERVER_ERROR = 'Server error, please try again later.',
}

export interface CommonResponse {
  statusCode: number
  message: string
  data: string
}

export interface CommonDataResponse {
  file: UploadedFileInformation
  link: string
}

export enum TOOLS {
  merge = 'merge',
  delete = 'delete',
  split = 'split',
  watermark = 'watermark',
  rotate = 'rotate',
  unlock = 'unlock',
  protect = 'protect',
  organize = 'organize',
  'to-word' = 'to-word',
  sort = 'sort',
  'extract-images' = 'extract-images',
  sign = 'sign',
  'remove-images' = 'remove-images',
  'img-convert-to-word&pdf' = 'img-conversions',
  'img-watermark' = 'img-watermark',
}

export enum FILE_TYPES {
  pdf = 'pdf',
  image = 'image',
  file = 'file',
}

export interface UploadedFileInformation {
  id: string
  file_path: string
  name: string
  size: number
  mime_type: string
  provider: string
  uploader: string
  image_content: unknown
  text_locale: unknown
  download_link: unknown
  tags: Array<unknown>
  metadata: unknown
  created_at: string
  updated_at: unknown
  deleted_at: unknown
}

export interface Profile {
  name: string
  picture: string
  user_id: string
  email: string
  current_plan: string
  enterprise_id: string
  status: string
}

export interface GetProfileResponse {
  data: Profile
}

export type ListFilesConversion = Record<string, Array<string>>

export interface GetListFilesConversionResponse {
  data: ListFilesConversion
  message: string
  statusCode: number
}

export interface ConvertFileToAnyRequest {
  file: File
  toFormat: string
  lang?: string
}

export interface ConvertFileToAnyResponse {
  data: { link: string }
  message: string
  statusCode: number
}

export interface AddWatermarkPDFRequest {
  file: File
  msg: string
  lang?: string
}

export interface AddWatermarkPDFResponse {
  statusCode: number
  message: string
  data: {
    file: UploadedFileInformation
    link: string
  }
}

export interface WatermarkListLinkDownload {
  fileName: string
  text: string
  link?: string
  err?: boolean
  loading: boolean
}

export interface SortPDFPagesRequest {
  file: File
  lang?: string
}

export interface ProtectPDFRequest {
  file: File
  password: string
  lang?: string
}

export interface SortPDFPagesResponse extends Omit<CommonResponse, 'data'> {
  data: CommonDataResponse
}
export interface ProtectPDFResponse extends Omit<CommonResponse, 'data'> {
  data: CommonDataResponse
}
export interface RotatePDFResponse extends Omit<CommonResponse, 'data'> {
  data: CommonDataResponse
}

export interface PageSwap {
  id: number
  selected: boolean
  file: File
}

export interface MergePDFRequest {
  files: Array<File>
  lang?: string
}
export interface MergePDFResponse extends Omit<CommonResponse, 'data'> {
  data: {
    file: UploadedFileInformation
    link: string
  }
}

export interface UnlockPDFRequest {
  file: File
  password: string
  lang?: string
}
export interface UnlockPDFResponse extends Omit<CommonResponse, 'data'> {
  data: {
    file: UploadedFileInformation
    link: string
  }
}

export interface SplitPDFRequest {
  ranges: RecordKS[][]
  file: File
  lang?: string
}
export interface SplitPDFResponse extends Omit<CommonResponse, 'data'> {
  data: {
    file: UploadedFileInformation
    link: string
  }
}

export interface PDFToWordRequest {
  file: File
}
export interface PDFToWordResponse extends Omit<CommonResponse, 'data'> {
  data: {
    file: UploadedFileInformation
    link: string
  }
}

export interface ExtractImageRequest {
  file: File
  lang?: string
}
export interface ExtractImageResponse extends Omit<CommonResponse, 'data'> {
  data: {
    file: UploadedFileInformation
    link: string
  }
}

export interface RemoveImageRequest {
  file: File
  lang?: string
}
export interface RemoveImageResponse extends Omit<CommonResponse, 'data'> {
  data: {
    file: UploadedFileInformation
    link: string
  }
}

export interface ImgToWordRequest {
  clientImage: File
  lang?: string
}
export interface ImgToWordResponse extends Omit<CommonResponse, 'data'> {
  data: {
    downloadLink: string
  }
}

export interface ImgToPDFRequest {
  clientImage: File
  lang?: string
}
export interface ImgToPDFResponse extends Omit<CommonResponse, 'data'> {
  data: {
    downloadLink: string
  }
}

export interface ImgToWatermarkRequest {
  clientImage: File
  msg: string
}
export interface ImgToWatermarkResponse extends Omit<CommonResponse, 'data'> {
  data: {
    link: string
  }
}
