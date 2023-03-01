import React, { FormEvent, useEffect } from 'react'
import { useHistory } from 'react-router'
import { FiLock } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import Logo from 'src/components/Common/Logo'
import { useLoginWithGoogle } from 'src/hooks/useAuthWithFirebase'
import AuthStore from 'src/stores/AuthStore'

function LoginPage() {
  const loading = false
  const history = useHistory()
  const { isLogin } = AuthStore
  const { LoginWithGoogle } = useLoginWithGoogle()
  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    return false
  }

  const login = async () => {
    const result = await LoginWithGoogle()
    if (result) history.push('/tools')
  }

  useEffect(() => {
    if (isLogin()) history.push('/tools')
  })

  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="card shadow-xl bg-base-100 p-16">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="flex justify-center">
              <Logo />
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                Let&lsquo;s make something great
              </span>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="space-y-4 rounded-md shadow-sm">
              <input type="text" placeholder="Username" className="input input-bordered w-full max-w" />
              <input type="text" placeholder="Password" className="input input-bordered w-full max-w" />
            </div>

            <div className="flex items-center justify-between">
              {/* <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div> */}

              <div className="text-sm">
                <p className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="btn w-full !bg-indigo-600 !text-white !border-none flex items-center space-x-2">
                {loading ? (
                  <progress className="progress progress-secondary w-56"></progress>
                ) : (
                  <>
                    <FiLock className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                    <span className="!capitalize">Sign in</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="divider">
          <span className="text-gray-400">OR</span>
        </div>
        <button className="btn !bg-white !text-black !border-gray-300 flex items-center space-x-2" onClick={login}>
          <FcGoogle className="h-6 w-6" />
          <span className="!capitalize">Login with Google</span>
        </button>
      </div>
    </div>
  )
}

export default React.memo(LoginPage)
