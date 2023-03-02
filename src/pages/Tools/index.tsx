import { observer } from 'mobx-react-lite'
import React, { PropsWithChildren, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PageContainer from 'src/components/Common/Container/Page'
import { FILE_TYPES } from 'src/configs/Types'
import ToolStore from 'src/stores/ToolStore'
import EmptyImg from 'src/assets/images/empty.png'

interface ToolsProps {}

function Tools({}: PropsWithChildren<ToolsProps>) {
  const { tools, toolsFilter } = ToolStore
  const history = useHistory()

  const randomNumber = () => {
    return Math.floor(Math.random() * 3)
  }

  const randomColorInRangeColors = () => {
    const colors = ['bg-indigo-400', 'bg-blue-400', 'bg-pink-400']
    return colors[randomNumber()]
  }

  useEffect(() => {
    const queries = new URLSearchParams(history.location.search)
    const tool = queries.get('t')
    if (tool && tool !== '') {
      toolsFilter(tool as FILE_TYPES)
    }
  }, [])

  return (
    <PageContainer>
      {tools.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="p-4 bg-slate-50/30 rounded-xl cursor-pointer drop-shadow-sm h-auto md:h-36"
              onClick={() => history.push('/file-convert')}>
              <div className="flex items-center">
                <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${randomColorInRangeColors()}`}>
                  <img src={tool.img} className="w-5" />
                </div>
                <p className="ml-4 text-md font-semibold">{tool.name}</p>
              </div>
              <p className="text-xs mt-2 text-gray-400 font-light">{tool.desc}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center h-96">
          <img className="w-48" src={EmptyImg} />
        </div>
      )}
    </PageContainer>
  )
}

export default observer(Tools)
