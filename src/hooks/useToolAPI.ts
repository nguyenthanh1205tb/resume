/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConvertFileToAnyRequest, ConvertFileToAnyResponse } from 'src/configs/Types'
import { request } from 'src/utils/request'
import { APIConfigs } from 'src/utils/request/core/ApiConfig'
import { toast } from 'react-toastify'

export const useConvertFileToAny = () => {
  const convertFileToAny = (payload: ConvertFileToAnyRequest) => {
    try {
      const req = request<ConvertFileToAnyResponse>(APIConfigs(), {
        url: '/convert/any',
        method: 'POST',
        formData: payload,
      })
      return req
    } catch (error: any) {
      if (error.status && error.status === 403) {
        toast('Please login to use this feature.', { type: 'error' })
      } else {
        toast('Convert fail, please try again later.', { type: 'error' })
      }
    }
  }

  return { convertFileToAny }
}
