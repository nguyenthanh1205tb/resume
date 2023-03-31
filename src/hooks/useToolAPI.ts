/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AddWatermarkPDFRequest,
  AddWatermarkPDFResponse,
  CommonDataResponse,
  ConvertFileToAnyRequest,
  ConvertFileToAnyResponse,
  ProtectPDFRequest,
  ProtectPDFResponse,
  RotatePDFResponse,
  SortPDFPagesRequest,
  SortPDFPagesResponse,
} from 'src/configs/Types'
import { request } from 'src/utils/request'
import { APIConfigs } from 'src/utils/request/core/ApiConfig'
import { toast } from 'react-toastify'
import { useState } from 'react'

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

export const useDeletePDFPages = () => {
  const [response, setResponse] = useState({
    loading: false,
    data: null as null | boolean,
    error: null as Error | null,
  })

  const splitPagesQueries = (p: number[]) => {
    const queries: string[] = []
    const pages: Array<number[]> = []
    for (let i = 0; i < p.length; i++) {
      if (i === 0) {
        pages.push([p[i]])
      } else {
        if (p[i] - 1 === p[i - 1]) {
          pages[pages.length - 1].push(p[i])
        } else {
          pages.push([p[i]])
        }
      }
    }
    // change to queries [number || number-number]
    pages.map(o => {
      if (o.length > 1) {
        queries.push(`${o[0]}-${o[o.length - 1]}`)
      } else {
        queries.push(`${o[0]}`)
      }
    })
    return queries
  }

  const deletePDFPages = async (p: number[], payload: { file: File; lang?: string }) => {
    setResponse({ loading: true, data: null, error: null })
    try {
      const pages = splitPagesQueries(p.sort())
      for (const thread in pages) {
        await request(APIConfigs(), {
          url: '/pdf/delete-pages',
          method: 'POST',
          query: {
            pages: pages[thread],
          },
          formData: payload,
        })
      }
      setResponse({ loading: false, data: true, error: null })
      return true
    } catch (error) {
      const text = 'Delete pages fail'
      setResponse({ loading: false, data: false, error: new Error(text, { cause: { error } }) })
      toast(text, { type: 'error' })
    }
  }
  return { deletePDFPages, response }
}

export const useAddWatermarkPDFFile = () => {
  const [response, setResponse] = useState({
    loading: false as boolean,
    data: null as AddWatermarkPDFResponse | null,
    error: null as Error | null,
  })
  const addWatermarkPDFFile = async (payload: AddWatermarkPDFRequest) => {
    setResponse({ loading: true, data: null, error: null })
    try {
      const result = await request<AddWatermarkPDFResponse>(APIConfigs(), {
        url: '/pdf/watermark',
        method: 'POST',
        formData: payload,
      })
      setResponse({ loading: false, data: result, error: null })
      return result
    } catch (error: any) {
      const status = error.status
      if (status && status === 403) {
        toast('You need login to use this feature', { type: 'error' })
      } else {
        toast('Add watermark fail, try again', { type: 'error' })
      }
      setResponse({ loading: false, data: null, error: new Error('Add watermark fail', { cause: { error } }) })
    }
  }
  return { response, addWatermarkPDFFile }
}

export const useSortPDFPages = () => {
  const [response, setResponse] = useState({
    loading: false as boolean,
    data: null as CommonDataResponse | null,
    error: null as Error | null,
  })

  const sortPDFPages = async (query: string, payload: SortPDFPagesRequest) => {
    setResponse({ loading: true, data: null, error: null })
    try {
      const result = await request<SortPDFPagesResponse>(APIConfigs(), {
        url: '/pdf/sort',
        method: 'POST',
        query: {
          sorts: query,
        },
        formData: payload,
      })
      setResponse({ loading: false, data: result.data, error: null })
      return result.data.link
    } catch (error) {
      const text = 'Sort PDF pages fail'
      setResponse({ loading: false, data: null, error: new Error(text, { cause: { error } }) })
    }
  }

  const clean = () => {
    setResponse({ loading: false, data: null, error: null })
  }

  return { sortPDFPages, response, clean }
}

export const useProtectPDF = () => {
  const [response, setResponse] = useState({
    loading: false as boolean,
    data: null as ProtectPDFResponse | null,
    error: null as Error | null,
  })
  const protectPDF = async (payload: ProtectPDFRequest) => {
    setResponse({ loading: true, data: null, error: null })
    try {
      const result = await request<ProtectPDFResponse>(APIConfigs(), {
        url: '/pdf/add-password',
        method: 'POST',
        formData: payload,
      })
      setResponse({ loading: false, data: result, error: null })
      return result.data.link
    } catch (error) {
      const text = 'error'
      setResponse({ loading: false, data: null, error: new Error(text, { cause: { error } }) })
    }
  }
  return { protectPDF, response }
}

export const useRotatePDF = () => {
  const [response, setResponse] = useState({
    loading: false as boolean,
    data: null as RotatePDFResponse | null,
    error: null as Error | null,
  })
  const rotatePDF = async (angle: number, payload: { file: File; lang?: string }) => {
    setResponse({ loading: true, data: null, error: null })
    try {
      const result = await request<RotatePDFResponse>(APIConfigs(), {
        url: '/pdf/rotation',
        method: 'POST',
        query: { angle },
        formData: payload,
      })
      setResponse({ loading: false, data: result, error: null })
      return result.data.link
    } catch (error) {
      const text = 'error'
      setResponse({ loading: false, data: null, error: new Error(text, { cause: { error } }) })
    }
  }
  return { rotatePDF, response }
}
