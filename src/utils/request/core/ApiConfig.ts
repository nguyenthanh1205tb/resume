import type { ApiRequestOptions } from './ApiRequestOptions'
import jscookie from 'js-cookie'

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>
type Headers = Record<string, string>

export type APIConfig = {
  BASE: string
  VERSION: string
  WITH_CREDENTIALS: boolean
  CREDENTIALS: 'include' | 'omit' | 'same-origin'
  TOKEN?: string | Resolver<string>
  USERNAME?: string | Resolver<string>
  PASSWORD?: string | Resolver<string>
  HEADERS?: Headers | Resolver<Headers>
  ENCODE_PATH?: (path: string) => string
}

export const APIConfigs = () =>
  ({
    BASE: 'https://status404.ddns.net',
    VERSION: '',
    WITH_CREDENTIALS: false,
    CREDENTIALS: 'same-origin',
    TOKEN: jscookie.get('token'),
    USERNAME: undefined,
    PASSWORD: undefined,
    HEADERS: undefined,
    ENCODE_PATH: undefined,
  } as APIConfig)
