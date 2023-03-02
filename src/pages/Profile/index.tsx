import classNames from 'classnames'
import React, { PropsWithChildren, useState } from 'react'
import PageContainer from 'src/components/Common/Container/Page'
import AuthStore from 'src/stores/AuthStore'
import ProfileImg from 'src/assets/images/profile.png'
import { observer } from 'mobx-react-lite'

function Profile() {
  const { user } = AuthStore
  const navs = [
    {
      key: 1,
      name: 'my details',
      disabled: false,
    },
    {
      key: 2,
      name: 'password',
      disabled: true,
    },
    {
      key: 3,
      name: 'storages',
      disabled: true,
    },
  ]
  const [navSelected] = useState(1)
  const [personalDetails] = useState([
    {
      name: 'display name',
      value: user?.displayName ?? '',
    },
    {
      name: 'email',
      value: user?.email ?? '',
    },
    {
      name: 'phone number',
      value: user?.phoneNumber ?? '',
    },
  ])

  return (
    <PageContainer>
      <div className="py-8 border-b">
        <p className="text-3xl font-semibold">Settings</p>
      </div>
      <div className="py-8 flex space-x-8">
        <div style={{ width: '200px' }}>
          <ul className="flex flex-col space-y-2">
            {navs.map(nav => (
              <li
                className={classNames('p-2 transition-all rounded-lg cursor-pointer', {
                  'bg-gray-100': navSelected === nav.key,
                  'text-gray-400': nav.disabled,
                })}
                key={nav.key}>
                <p className="capitalize font-semibold">{nav.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          {user ? (
            <div className="min-h-screen">
              <div className="mb-8">
                <div tabIndex={-1} className="bg-gray-50 rounded-tl-3xl" style={{ height: '200px' }}></div>
                <div className="-mt-8 pl-8 flex w-full">
                  <div className="avatar">
                    <div className="w-32 rounded-full">
                      <img src={user.photoURL ?? ProfileImg} />
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
            </div>
          ) : null}
        </div>
      </div>
    </PageContainer>
  )
}
export default observer(Profile)
