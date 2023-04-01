/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify'
import { ErrorStatusMessage } from 'src/configs/Types'

export const useErrorHandle = () => {
  const showError = (error: any, msg?: string) => {
    const statusCode: number = error.status
    switch (statusCode) {
      case 500:
        toast(ErrorStatusMessage.SERVER_ERROR, { type: 'error' })
        break
      case 403:
        toast(ErrorStatusMessage.UN_AUTHORIZE, { type: 'error' })
        break
      default:
        // eslint-disable-next-line no-console
        console.log({ error })
        toast(msg, { type: 'error' })
    }
  }
  return { showError }
}
