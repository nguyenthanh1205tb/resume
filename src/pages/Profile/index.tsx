import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'

import PageContainer from 'src/components/Common/Container/Page'
import AuthStore from 'src/stores/AuthStore'

import Profile from './Profile'
import Storages from './Storages'

function ProfileSettings() {
  const { profile } = AuthStore
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
      disabled: false,
    },
  ]
  const [navSelected, setNavSelected] = useState(1)

  const onChangeTab = (k: number) => {
    setNavSelected(k)
  }

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
                key={nav.key}
                onClick={() => onChangeTab(nav.key)}>
                <p className="capitalize font-semibold">{nav.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 min-h-screen">
          {navSelected === 1 ? <Profile /> : null}
          {navSelected === 3 ? <Storages /> : null}
        </div>
      </div>
    </PageContainer>
  )
}
export default observer(ProfileSettings)
