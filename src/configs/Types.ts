export enum FILE_TYPES {
  pdf = 'pdf',
  image = 'image',
  file = 'file',
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
