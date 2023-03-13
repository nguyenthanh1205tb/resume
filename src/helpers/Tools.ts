import { ListFilesConversion } from 'src/configs/Types'
import _uniq from 'lodash/uniq'

export const organizeListFilesConvertibles = async (files: ListFilesConversion) => {
  const l: ListFilesConversion = {}
  const result = await new Promise<Array<string>>(resolve => {
    let f: string[] = []
    for (const key of Object.keys(files)) {
      f = [...f, ...files[key]]
    }
    resolve(f)
  })
  const f = _uniq(result)
  f.map(n => {
    for (const key of Object.keys(files)) {
      if (files[key].includes(n)) {
        l[n] = [...(l[n] ?? []), key]
      }
    }
  })
  return { listFileAccepted: f, ListFilesConvertibles: l }
}

export const createDownload = (link: string) => {
  const l = document.createElement('a')
  l.download = link
  l.href = link
  l.setAttribute('target', '_blank')
  document.body.appendChild(l)
  return {
    download: () => {
      l.dispatchEvent(new MouseEvent('click'))
      return document.body.removeChild(l)
    },
  }
}
