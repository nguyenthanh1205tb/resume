import { APIConfigs } from 'src/utils/request/core/ApiConfig'
import { request } from 'src/utils/request'
import { GetProfileResponse, Profile } from 'src/configs/Types'
import { useState } from 'react'
import AuthStore from 'src/stores/AuthStore'

const useGetProfile = () => {
  const { setProfile } = AuthStore
  const [response, setResponse] = useState({
    loading: false,
    error: null as Error | null,
    data: null as Profile | null,
  })
  const getProfile = async () => {
    setResponse({ loading: true, error: null, data: null })
    try {
      const result = await request<GetProfileResponse>(APIConfigs(), {
        url: '/me',
        method: 'GET',
      })
      setProfile(result.data)
      setResponse({ loading: false, error: null, data: result.data })
      return result.data
    } catch (error) {
      setResponse({ loading: false, error: new Error('Get profile fail'), data: null })
    }
  }

  return { response, getProfile }
}

export { useGetProfile }
