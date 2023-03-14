import { auth } from 'src/utils/firebase'
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  signOut,
  getIdToken,
} from '@firebase/auth'
import { useState } from 'react'
import AuthStore from 'src/stores/AuthStore'
import { useGetProfile } from './useUserAPI'
import CommonStore from 'src/stores/CommonStore'
type LoginResponse = {
  loading: boolean
  data: null | UserCredential
  error: Error | null
}

export const useLoginWithEmailPwd = () => {
  const { setCredential, setProfile } = AuthStore
  const { getProfile } = useGetProfile()
  const [response, setResponse] = useState<LoginResponse>({
    loading: false,
    data: null,
    error: null,
  })

  const LoginWithEmailPwd = async (payload: { email: string; password: string }) => {
    const { email, password } = payload
    setResponse({ loading: true, data: null, error: null })
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const token = await getIdToken(result.user)
      setCredential(token)
      const profile = await getProfile()
      profile && setProfile(profile)
      setResponse({ loading: false, data: result, error: null })
      return true
    } catch (error) {
      setResponse({ loading: false, data: null, error: new Error('Login fail') })
    }
  }

  return { response, LoginWithEmailPwd }
}

export const useLoginWithGoogle = () => {
  const { setLoadingPage } = CommonStore
  const { setCredential, setProfile } = AuthStore
  const { getProfile } = useGetProfile()
  const ggProvider = new GoogleAuthProvider()
  const LoginWithGoogle = async () => {
    setLoadingPage(true)
    try {
      const result = await signInWithPopup(auth, ggProvider)
      const token = await getIdToken(result.user)
      setCredential(token)
      const profile = await getProfile()
      profile && setProfile(profile)
      setLoadingPage(false)
      return true
    } catch (error) {
      console.log({ error })
      setLoadingPage(false)
      throw new Error('Login fail')
    }
  }

  return { LoginWithGoogle }
}

export const useLogout = () => {
  const { setLoadingPage } = CommonStore
  const { removeCredentials: _logOut } = AuthStore
  const removeCredentials = async () => {
    setLoadingPage(true)
    try {
      await signOut(auth)
      _logOut()
      setLoadingPage(false)
    } catch (error) {
      setLoadingPage(false)
      throw new Error('logout fail')
    }
  }

  return { removeCredentials }
}
