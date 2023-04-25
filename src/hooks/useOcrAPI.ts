import { useState } from 'react'
import {
  ImgToPDFRequest,
  ImgToPDFResponse,
  ImgToWatermarkRequest,
  ImgToWatermarkResponse,
  ImgToWordRequest,
  ImgToWordResponse,
} from 'src/configs/Types'
import { request } from 'src/utils/request'
import { APIConfigs } from 'src/utils/request/core/ApiConfig'
import { useErrorHandle } from './useErrorHandle'

export const useImgToWord = () => {
  const { showError } = useErrorHandle()
  const [response, setResponse] = useState({
    loading: false as boolean,
    data: null as ImgToWordResponse | null,
    error: null as Error | null,
  })
  const convertImgToWord = async (payload: ImgToWordRequest) => {
    setResponse({ loading: true, data: null, error: null })
    try {
      const result = await request<ImgToWordResponse>(APIConfigs(), {
        url: '/images/docx',
        method: 'POST',
        formData: payload,
      })
      setResponse({ loading: false, data: result, error: null })
      return result.data.downloadLink
    } catch (error) {
      const msg = 'Convert image to word fail'
      setResponse({ loading: false, data: null, error: new Error(msg, { cause: { error } }) })
      showError(error, msg)
    }
  }
  return { convertImgToWord, response }
}

export const useImgToPDF = () => {
  const { showError } = useErrorHandle()
  const [response, setResponse] = useState({
    loading: false as boolean,
    data: null as ImgToPDFResponse | null,
    error: null as Error | null,
  })
  const convertImgToPDF = async (payload: ImgToPDFRequest) => {
    setResponse({ loading: true, data: null, error: null })
    try {
      const result = await request<ImgToPDFResponse>(APIConfigs(), {
        url: '/images/pdf',
        method: 'POST',
        formData: payload,
      })
      setResponse({ loading: false, data: result, error: null })
      return result.data.downloadLink
    } catch (error) {
      const msg = 'convert image to pdf fail'
      setResponse({ loading: false, data: null, error: new Error(msg, { cause: { error } }) })
      showError(error, msg)
    }
  }
  return { convertImgToPDF, response }
}

export const useImgWatermark = () => {
  const { showError } = useErrorHandle()
  const [response, setResponse] = useState({
    loading: false as boolean,
    data: null as ImgToWatermarkResponse | null,
    error: null as Error | null,
  })
  const addImgWatermark = async (payload: ImgToWatermarkRequest) => {
    setResponse({ loading: true, data: null, error: null })
    try {
      const result = await request<ImgToWatermarkResponse>(APIConfigs(), {
        url: '/images/watermark',
        method: 'POST',
        formData: payload,
      })
      setResponse({ loading: false, data: result, error: null })
      return result.data.link
    } catch (error) {
      const msg = 'Add image watermark fail'
      setResponse({ loading: false, data: null, error: new Error(msg, { cause: { error } }) })
      showError(error, msg)
    }
  }
  return { addImgWatermark, response }
}
