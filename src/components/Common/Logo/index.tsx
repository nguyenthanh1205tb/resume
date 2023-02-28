import React, { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

interface LogoProps {}
function Logo({}: PropsWithChildren<LogoProps>) {
  return (
    <Link to="/" className="btn btn-ghost normal-case hover:bg-white">
      <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-600">
        Sota Conversion
      </span>
    </Link>
  )
}
export default Logo
