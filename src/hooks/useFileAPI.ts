import { useState } from 'react'

import {
  ConvertFileToAnyRequest,
  ConvertFileToAnyResponse,
  GetListFilesConversionResponse,
  ListFilesConversion,
} from 'src/configs/Types'
import ToolStore from 'src/stores/ToolStore'
import { request } from 'src/utils/request'
import { APIConfigs } from 'src/utils/request/core/ApiConfig'

import { useErrorHandle } from './useErrorHandle'

export const useConvertFileToAny = () => {
  const { showError } = useErrorHandle()
  const convertFileToAny = (payload: ConvertFileToAnyRequest) => {
    try {
      const req = request<ConvertFileToAnyResponse>(APIConfigs(), {
        url: '/convert/any',
        method: 'POST',
        formData: payload,
      })
      return req
    } catch (error: any) {
      const msg = 'Convert fail'
      showError(error, msg)
    }
  }

  return { convertFileToAny }
}

export const useGetListFilesConversion = () => {
  const { setListFilesConversion } = ToolStore
  const [response, setResponse] = useState({
    loading: false,
    data: null as ListFilesConversion | null,
    error: null as Error | null,
  })

  const getListFilesConversion = async () => {
    setResponse({ loading: true, data: null, error: null })
    try {
      const result = await request<GetListFilesConversionResponse>(APIConfigs(), {
        url: '/conversion',
        method: 'GET',
      })
      setListFilesConversion(result.data)
      setResponse({ loading: false, data: result.data, error: null })
      return result.data
    } catch (error) {
      setResponse({ loading: false, data: null, error: new Error('Get lis file conversion fail') })
    }
  }
  return { getListFilesConversion, response }
}
