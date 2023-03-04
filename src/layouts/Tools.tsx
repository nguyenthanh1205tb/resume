import React, { Fragment, PropsWithChildren } from 'react'
import HeroSearch from 'src/components/Common/Search'
import ToolStore from 'src/stores/ToolStore'

interface ToolsLayoutProps {}

function ToolsLayout({ children }: PropsWithChildren<ToolsLayoutProps>) {
  const { toolsSearch } = ToolStore

  return (
    <div className="pt-8 pb-16" style={{ minHeight: '768px' }}>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">.Tools.</h1>
        <p>Every tools you need to work in one place</p>
        <HeroSearch onChange={toolsSearch} />
      </div>
      {children}
    </div>
  )
}

export default ToolsLayout
