import { useState } from 'react'
import { GetListFilesConversionResponse, ListFilesConversion } from 'src/configs/Types'
import ToolStore from 'src/stores/ToolStore'
import { request } from 'src/utils/request'
import { APIConfigs } from 'src/utils/request/core/ApiConfig'

export const useFileConvertAny = () => {
  const [response, setResponse] = useState({
    loading: false,
    data: null,
    error: null as Error | null,
  })

  const fileConvertAny = async (type: string) => {
    setResponse({ loading: false, data: null, error: null })
    try {
      const result = await request(APIConfigs(), {
        url: '/convert/any',
        method: 'POST',
      })
      console.log(result)
    } catch (error) {
      setResponse({ loading: false, data: null, error: new Error(`Convert to ${type} fail`) })
    }
  }

  return { fileConvertAny }
}

export const useGetListFilesConversion = () => {
  const { setListFilesConversion } = ToolStore
  const [response, setResponse] = useState({
    loading: false,
    data: null as ListFilesConversion | null,
    error: null as Error | null,
  })

  const getListFilesConversion = async () => {
    setResponse({ loading: false, data: null, error: null })
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
