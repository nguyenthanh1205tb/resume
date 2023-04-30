import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'

import ProfileImg from 'src/assets/images/profile.png'
import AuthStore from 'src/stores/AuthStore'

function Profile() {
  const { profile } = AuthStore
  const [personalDetails] = useState([
    {
      name: 'display name',
      value: profile?.name ?? '',
    },
    {
      name: 'email',
      value: profile?.email ?? '',
    },
    {
      name: 'Status',
      value: profile?.status ?? '',
    },
  ])
  return (
    <>
      <div className="mb-8">
        <div tabIndex={-1} className="bg-gray-50 rounded-tl-3xl" style={{ height: '200px' }}></div>
        <div className="-mt-8 pl-8 flex w-full">
          <div className="avatar">
            <div className="w-32 rounded-full">
              <img src={profile?.picture ?? ProfileImg} />
            </div>
          </div>
          <div className="flex-1 p-5 flex justify-end flex-col space-y-1">
            <p className="text-2xl font-semibold">Profile</p>
            <p className="text-sm text-gray-600">See all your personal details</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-8">
        {personalDetails.map((p, index) => (
          <div key={index} className="grid grid-cols-12 grid-rows-1 border-b pb-8 border-gray-100">
            <div className="col-span-4 flex items-center">
              <p className="capitalize text-sm font-semibold">{p.name}:</p>
            </div>
            <div className="col-span-8">
              <input
                type="text"
                className="input !text-sm input-bordered border-none w-full max-w-xs !bg-gray-50"
                disabled
                defaultValue={p.value}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
export default observer(Profile)
