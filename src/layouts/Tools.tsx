import React, { Fragment, PropsWithChildren } from 'react'
import SearchImg from 'src/assets/images/search.png'

interface ToolsLayoutProps {}

function ToolsLayout({ children }: PropsWithChildren<ToolsLayoutProps>) {
  return (
    <Fragment>
      <div className="py-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold">.Tools.</h1>
          <p>Every tools you need to work in one place</p>
          <div className="flex flex-col justify-center items-center py-8 px-8">
            <div className="form-control drop-shadow-sm w-full sm:w-96">
              <label className="input-group input-group-lg ">
                <label className="input-group">
                  <span className="!bg-white !rounded-l-full">
                    <img src={SearchImg} alt="i" className="w-7" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered w-full !outline-none border-none !pl-0"
                  />
                  <div className="bg-white !rounded-r-full pr-2 flex items-center">
                    <button className="btn border-none !bg-blue-500 btn-sm !rounded-full !text-md !capitalize">
                      Search
                    </button>
                  </div>
                </label>
              </label>
            </div>
          </div>
        </div>
        {children}
      </div>
    </Fragment>
  )
}

export default React.memo(ToolsLayout)
