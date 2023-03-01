import React, { Fragment, PropsWithChildren } from 'react'
import Logo from 'src/components/Common/Logo'

import { Link } from 'react-router-dom'
import UserNav from './UserNav'
import { observer } from 'mobx-react-lite'

interface NavbarProps {}
function Navbar({}: PropsWithChildren<NavbarProps>) {
  const navs = [
    {
      name: 'Tools',
      link: '/tools',
    },
    {
      name: 'OCR',
      link: '/ocr',
    },
    {
      name: 'File Convert',
      link: '/file-convert',
    },
    {
      name: 'Privacy',
      link: '/privacy',
    },
  ]
  return (
    <Fragment>
      <div className="lg:hidden">
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
                {navs.map((nav, index) => (
                  <li key={index}>
                    <Link to={nav.link}>{nav.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="navbar-center">
            <Logo />
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
            <UserNav />
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Logo />
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              {navs.map((nav, index) => (
                <li key={index}>
                  <Link to={nav.link}>{nav.name}</Link>
                </li>
              ))}
            </ul>
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
            <UserNav />
          </div>
        </div>
      </div>
    </Fragment>
  )
}
export default observer(Navbar)
