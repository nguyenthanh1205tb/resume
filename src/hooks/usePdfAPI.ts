/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

import {
  AddWatermarkPDFRequest,
  AddWatermarkPDFResponse,
  CommonDataResponse,
  ExtractImageRequest,
  ExtractImageResponse,
  MergePDFRequest,
  MergePDFResponse,
  PDFToWordRequest,
  PDFToWordResponse,
  ProtectPDFRequest,
  ProtectPDFResponse,
  RemoveImageRequest,
  RemoveImageResponse,
  RotatePDFResponse,
  SortPDFPagesRequest,
  SortPDFPagesResponse,
  SplitPDFRequest,
  SplitPDFResponse,
  UnlockPDFRequest,
  UnlockPDFResponse,
} from 'src/configs/Types'
import { request } from 'src/utils/request'
import { APIConfigs } from 'src/utils/request/core/ApiConfig'

import { useErrorHandle } from './useErrorHandle'

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

export const useDeletePDFPages = () => {
  const { showError } = useErrorHandle()
  const [response, setResponse] = useState({
    loading: false,
    data: null as null | boolean,
    error: null as Error | null,
  })

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
      const msg = 'Delete pages fail'
      setResponse({ loading: false, data: false, error: new Error(msg, { cause: { error } }) })
      showError(error, msg)
    }
  }
  return { deletePDFPages, response }
}

export const useAddWatermarkPDFFile = () => {
  const { showError } = useErrorHandle()
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
      const msg = 'Add watermark fail'
      setResponse({ loading: false, data: null, error: new Error(msg, { cause: { error } }) })
      showError(error, msg)
    }
  }
  return { response, addWatermarkPDFFile }
}

export const useSortPDFPages = () => {
  const { showError } = useErrorHandle()
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
      const msg = 'Sort PDF pages fail'
      setResponse({ loading: false, data: null, error: new Error(msg, { cause: { error } }) })
      showError(error, msg)
    }
  }

  const clean = () => {
    setResponse({ loading: false, data: null, error: null })
  }

  return { sortPDFPages, response, clean }
}

export const useProtectPDF = () => {
  const { showError } = useErrorHandle()
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
      const msg = 'Add password to PDF fail'
      setResponse({ loading: false, data: null, error: new Error(msg, { cause: { error } }) })
      showError(error, msg)
    }
  }
  return { protectPDF, response }
}

export const useRotatePDF = () => {
  const { showError } = useErrorHandle()
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
      const msg = 'Rotate PDF page fail'
      setResponse({ loading: false, data: null, error: new Error(msg, { cause: { error } }) })
      showError(error, msg)
    }
  }
  return { rotatePDF, response }
}

export const useMergePDF = () => {
  const { showError } = useErrorHandle()
  const [response, setResponse] = useState({
    loading: false as boolean,
    data: null as MergePDFResponse | null,
    error: null as Error | null,
  })
  const mergePDF = async (payload: MergePDFRequest) => {
    setResponse({ loading: true, data: null, error: null })
    try {
      const result = await request<MergePDFResponse>(APIConfigs(), {
        url: '/pdf/mergers',
        method: 'POST',
        formData: payload,
      })
      setResponse({ loading: false, data: result, error: null })
      return result.data
    } catch (error) {
      const msg = 'Merge files fail'
      setResponse({ loading: false, data: null, error: new Error(msg, { cause: { error } }) })
      showError(error, msg)
    }
  }
  return { mergePDF, response }
}

export const useUnlockPDF = () => {
  const { showError } = useErrorHandle()
  const [response, setResponse] = useState({
    loading: false as boolean,
    data: null as UnlockPDFResponse | null,
    error: null as Error | null,
  })
  const unlockPDF = async (payload: UnlockPDFRequest) => {
    setResponse({ loading: true, data: null, error: null })
    try {
      const result = await request<UnlockPDFResponse>(APIConfigs(), {
        url: '/pdf/reset-password',
        method: 'POST',
        formData: payload,
      })
      setResponse({ loading: false, data: result, error: null })
      return result.data
    } catch (error) {
      const msg = 'Unlock pdf fail'
      setResponse({ loading: false, data: null, error: new Error(msg, { cause: { error } }) })
      showError(error, msg)
    }
  }
  return { unlockPDF, response }
}

export const useSplitPDF = () => {
  const { showError } = useErrorHandle()
  const [response, setResponse] = useState({
    loading: false as boolean,
    data: null as SplitPDFResponse | null,
    error: null as Error | null,
  })
  const splitPDF = async (payload: SplitPDFRequest) => {
    setResponse({ loading: true, data: null, error: null })
    try {
      const rangesSorted = payload.ranges.map(o => o.map(l => l.id).sort((a, b) => (a as number) - (b as number)))
      const ranges = rangesSorted.map(o => splitPagesQueries(o as number[]))
      if (!ranges.length) throw new Error('please, drag and drop the page which you want to split into the box')
      const result = await request<SplitPDFResponse>(APIConfigs(), {
        url: '/pdf/split',
        method: 'POST',
        formData: {
          file: payload.file,
          lang: payload.lang,
          ranges,
        },
      })
      setResponse({ loading: false, data: result, error: null })
      return result.data
    } catch (error: any) {
      const msg = error.message ?? 'Split pdf fail'
      setResponse({ loading: false, data: null, error: new Error(msg, { cause: { error } }) })
      showError(error, msg)
    }
  }
  return { splitPDF, response }
}

export const usePDFToWord = () => {
  const { showError } = useErrorHandle()
  const [response, setResponse] = useState({
    loading: false as boolean,
    data: null as PDFToWordResponse | null,
    error: null as Error | null,
  })
  const pdfToWord = async (payload: PDFToWordRequest) => {
    setResponse({ loading: true, data: null, error: null })
    try {
      const result = await request<PDFToWordResponse>(APIConfigs(), {
        url: '/pdf/docx',
        method: 'POST',
        formData: payload,
      })
      setResponse({ loading: false, data: result, error: null })
      return result.data
    } catch (error) {
      const msg = 'Convert PDF to word fail'
      setResponse({ loading: false, data: null, error: new Error(msg, { cause: { error } }) })
      showError(error, msg)
    }
  }
  return { pdfToWord, response }
}

export const useExtractImage = () => {
  const { showError } = useErrorHandle()
  const [response, setResponse] = useState({
    loading: false as boolean,
    data: null as ExtractImageResponse | null,
    error: null as Error | null,
  })
  const extractImage = async (payload: ExtractImageRequest) => {
    setResponse({ loading: true, data: null, error: null })
    try {
      const result = await request<ExtractImageResponse>(APIConfigs(), {
        url: '/pdf/extract-images',
        method: 'POST',
        formData: payload,
      })
      setResponse({ loading: false, data: result, error: null })
      return result.data
    } catch (error) {
      const msg = 'Extract image fail'
      setResponse({ loading: false, data: null, error: new Error(msg, { cause: { error } }) })
      showError(error, msg)
    }
  }
  return { extractImage, response }
}

export const useRemoveImage = () => {
  const { showError } = useErrorHandle()
  const [response, setResponse] = useState({
    loading: false as boolean,
    data: null as RemoveImageResponse | null,
    error: null as Error | null,
  })
  const removeImage = async (payload: RemoveImageRequest) => {
    setResponse({ loading: true, data: null, error: null })
    try {
      const result = await request<RemoveImageResponse>(APIConfigs(), {
        url: '/pdf/remove-images',
        method: 'POST',
        formData: payload,
      })
      setResponse({ loading: false, data: result, error: null })
      return result.data
    } catch (error) {
      const msg = 'Extract image fail'
      setResponse({ loading: false, data: null, error: new Error(msg, { cause: { error } }) })
      showError(error, msg)
    }
  }
  return { removeImage, response }
}
