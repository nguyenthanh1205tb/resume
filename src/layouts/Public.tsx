import React, { PropsWithChildren, Fragment, useState } from 'react'
import ProfileImg from 'src/assets/images/profile.png'
import FacebookImg from 'src/assets/images/facebook.png'
import TwitterImg from 'src/assets/images/twitter.png'
import GithubImg from 'src/assets/images/github.png'
import { Link } from 'react-router-dom'

interface PublicLayoutProps {}

function PublicLayout({ children }: PropsWithChildren<PublicLayoutProps>) {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <Fragment>
      <div className="navbar bg-base-100 h-16">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content p-2 shadow bg-base-100 rounded-box w-52"
              style={{ marginTop: '0.8rem' }}>
              <li>
                <Link to="/tools">Tools</Link>
              </li>
              <li>
                <a>Image</a>
              </li>
              <li>
                <a>File</a>
              </li>
              <li>
                <a>PDF</a>
              </li>
              <li>
                <a>Privacy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case hover:bg-white">
            <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-600">
              Sota Conversion
            </span>
          </a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {!isLogin ? (
            <button className="btn btn-md !bg-blue-500 !border-blue-500" onClick={() => setIsLogin(true)}>
              Sign in
            </button>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={ProfileImg} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <li>
                  <p className="justify-between">
                    Profile
                    {/* <span className="badge">New</span> */}
                  </p>
                </li>
                <li>
                  <p>Settings</p>
                </li>
                <li>
                  <p onClick={() => setIsLogin(false)}>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center p-4 bg-blue-500 text-white space-x-4">
        <p>Want new updates? No Spam.</p>
        <button className="btn btn-sm btn-outline !border-white !text-white !capitalize !text-xs">Subscribe</button>
      </div>
      {children}
      <div className="mt-8 text-white">
        <div className="bg-blue-500">
          <div className="py-6 px-4 flex items-center justify-between m-auto" style={{ maxWidth: '1024px' }}>
            <p>Find us on any of these platforms, we respond 1-2 business days.</p>
            <div className="flex flex-row items-center justify-center space-x-4">
              <a className="btn btn-outline border-none hover:bg-transparent !p-0">
                <img src={FacebookImg} className="w-6" />
              </a>
              <a className="btn btn-outline border-none hover:bg-transparent !p-0">
                <img src={TwitterImg} className="w-6" />
              </a>
              <a className="btn btn-outline border-none hover:bg-transparent !p-0">
                <img src={GithubImg} className="w-6" />
              </a>
            </div>
          </div>
        </div>
        <div
          className="px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-32 text-black m-auto"
          style={{ maxWidth: '1024px' }}>
          <div>
            <p className="text-4xl font-semibold">Let&apos;s keep in touch!</p>
            <p className="mt-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-600 text-2xl">
                Sota Conversion
              </span>{' '}
              provides free online conversion, pdf, and other handy tools to help you solve problems of all types. All
              files both processed and unprocessed are deleted after 1 hour
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <p className="text-lg font-bold">Useful links</p>
              <ul className="flex flex-col space-y-1">
                <li>
                  <Link to="#">About</Link>
                </li>
                <li>
                  <Link to="#">Blog</Link>
                </li>
                <li>
                  <Link to="#">Free products</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-lg font-bold">Other resources</p>
              <ul className="flex flex-col space-y-1">
                <li>
                  <Link to="#">Terms & conditions</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy policy</Link>
                </li>
                <li>
                  <Link to="#">Contact us</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-black flex justify-center items-center pb-4">
          <p className="text-sm">Copyright © 2023 SOTA Solutions.</p>
        </div>
      </div>
    </Fragment>
  )
}

export default React.memo(PublicLayout)
