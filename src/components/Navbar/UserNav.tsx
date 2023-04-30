import { observer } from 'mobx-react-lite'
import React from 'react'
import { useHistory } from 'react-router-dom'

import ProfileImg from 'src/assets/images/profile.png'
import { useLogout } from 'src/hooks/useAuthWithFirebase'
import AuthStore from 'src/stores/AuthStore'

function UserNav() {
  const history = useHistory()
  const { profile } = AuthStore
  const { removeCredentials } = useLogout()

  const goToLoginPage = () => history.push('/sign-in')
  const goToProfilePage = () => history.push('/profile')

  return !profile ? (
    <button className="btn btn-md btn-ghost" onClick={goToLoginPage}>
      Sign in
    </button>
  ) : (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src={profile.picture ?? ProfileImg} />
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <p className="justify-between" onClick={goToProfilePage}>
            Profile
            <span className="badge">New</span>
          </p>
        </li>
        <li>
          <p onClick={removeCredentials}>Logout</p>
        </li>
      </ul>
    </div>
  )
}
export default observer(UserNav)
