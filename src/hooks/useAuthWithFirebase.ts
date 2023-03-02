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
type LoginResponse = {
  loading: boolean
  data: null | UserCredential
  error: Error | null
}

const useLoginWithEmailPwd = () => {
  const { setCredential, setUser } = AuthStore
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
      setUser(result.user.providerData[0])
      setResponse({ loading: false, data: result, error: null })
      return true
    } catch (error) {
      setResponse({ loading: false, data: null, error: new Error('Login fail') })
    }
  }

  return { response, LoginWithEmailPwd }
}

const useLoginWithGoogle = () => {
  const { setCredential, setUser } = AuthStore
  const ggProvider = new GoogleAuthProvider()
  const LoginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, ggProvider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      if (credential) setCredential(credential)
      setUser(result.user.providerData[0])
      return true
    } catch (error) {
      throw new Error('Login fail')
    }
  }

  return { LoginWithGoogle }
}

const useLogout = () => {
  const { logOut: _logOut } = AuthStore
  const logOut = async () => {
    try {
      await signOut(auth)
      _logOut()
    } catch (error) {
      throw new Error('logout fail')
    }
  }

  return { logOut }
}

export { useLoginWithEmailPwd, useLoginWithGoogle, useLogout }
