export type RecordKS<D = unknown> = Record<string, D>

export enum ErrorStatusMessage {
  UN_AUTHORIZE = 'Please login to use this feature.',
  SERVER_ERROR = 'Server error, please try again later.',
}

export interface Project {
  name: string
  desc?: string
  shortDesc: string
  thumb: string
  link: string
  otherLink?: { name: string; link: string }[]
  isDone: boolean
  isDemo?: boolean
}
