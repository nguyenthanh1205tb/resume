import jscookie from 'js-cookie'

import type { ApiRequestOptions } from './ApiRequestOptions'

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
  X_API_KEY: string
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
    X_API_KEY: 'Vc3XORbwEbGBI_8OxRMyRK9bJ4XFNivlGcoPmarE5h0',
  } as APIConfig)
